import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useSiteData } from '@/hooks/useSiteData';

const Admin = () => {
  const { toast } = useToast();
  const { data, loading } = useSiteData('all');
  
  const [specialist, setSpecialist] = useState({
    full_name: '',
    title: '',
    bio: '',
    phone: '',
    whatsapp: '',
    telegram: '',
    instagram: '',
    photo_url: ''
  });

  const [services, setServices] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  
  const [sqlQuery, setSqlQuery] = useState('');
  
  useEffect(() => {
    if (data.specialist) {
      setSpecialist(data.specialist);
    }
    if (data.services) {
      setServices(data.services);
    }
    if (data.articles) {
      setArticles(data.articles);
    }
    if (data.testimonials) {
      setTestimonials(data.testimonials);
    }
    if (data.trips) {
      setTrips(data.trips);
    }
  }, [data]);

  const generateSQL = () => {
    let sql = '';
    
    sql += `-- Обновление информации о специалисте\n`;
    sql += `UPDATE specialist_info SET\n`;
    sql += `  full_name = '${specialist.full_name.replace(/'/g, "''")}',\n`;
    sql += `  title = '${specialist.title.replace(/'/g, "''")}',\n`;
    sql += `  bio = '${specialist.bio.replace(/'/g, "''")}',\n`;
    sql += `  phone = '${specialist.phone}',\n`;
    sql += `  whatsapp = '${specialist.whatsapp}',\n`;
    sql += `  telegram = '${specialist.telegram}',\n`;
    sql += `  instagram = '${specialist.instagram}',\n`;
    sql += `  photo_url = '${specialist.photo_url}'\n`;
    sql += `WHERE id = 1;\n\n`;
    
    sql += `-- Обновление услуг\n`;
    services.forEach(s => {
      sql += `UPDATE services SET\n`;
      sql += `  title = '${s.title.replace(/'/g, "''")}',\n`;
      sql += `  price = ${s.price},\n`;
      sql += `  duration = '${s.duration.replace(/'/g, "''")}',\n`;
      sql += `  description = '${s.description.replace(/'/g, "''")}',\n`;
      sql += `  category = '${s.category}',\n`;
      sql += `  icon = '${s.icon}'\n`;
      sql += `WHERE id = ${s.id};\n\n`;
    });
    
    sql += `-- Обновление статей\n`;
    articles.forEach(a => {
      sql += `UPDATE articles SET\n`;
      sql += `  title = '${a.title.replace(/'/g, "''")}',\n`;
      sql += `  category = '${a.category.replace(/'/g, "''")}',\n`;
      sql += `  excerpt = '${a.excerpt.replace(/'/g, "''")}',\n`;
      sql += `  content = '${a.content.replace(/'/g, "''")}'\n`;
      sql += `WHERE id = ${a.id};\n\n`;
    });
    
    sql += `-- Обновление отзывов\n`;
    testimonials.forEach(t => {
      sql += `UPDATE testimonials SET\n`;
      sql += `  client_name = '${t.client_name.replace(/'/g, "''")}',\n`;
      sql += `  city = '${t.city.replace(/'/g, "''")}',\n`;
      sql += `  text = '${t.text.replace(/'/g, "''")}',\n`;
      sql += `  rating = ${t.rating}\n`;
      sql += `WHERE id = ${t.id};\n\n`;
    });
    
    sql += `-- Обновление командировок\n`;
    trips.forEach(tr => {
      sql += `UPDATE business_trips SET\n`;
      sql += `  city = '${tr.city.replace(/'/g, "''")}',\n`;
      sql += `  current_applications = ${tr.current_applications},\n`;
      sql += `  required_for_trip = ${tr.required_for_trip},\n`;
      sql += `  status = '${tr.status}'\n`;
      sql += `WHERE id = ${tr.id};\n\n`;
    });
    
    setSqlQuery(sql);
    return sql;
  };

  const handleCopySQL = () => {
    const sql = generateSQL();
    navigator.clipboard.writeText(sql);
    toast({
      title: "SQL скопирован!",
      description: "Теперь отправьте его мне в чат",
    });
  };

  const addNewService = () => {
    const maxId = Math.max(...services.map(s => s.id), 0);
    const newService = {
      id: maxId + 1,
      title: 'Новая услуга',
      price: 3000,
      duration: '60 минут',
      description: 'Описание услуги',
      category: 'therapy',
      icon: 'Heart'
    };
    setServices([...services, newService]);
  };

  const removeService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
  };

  const addNewArticle = () => {
    const maxId = Math.max(...articles.map(a => a.id), 0);
    const newArticle = {
      id: maxId + 1,
      title: 'Новая статья',
      category: 'Для родителей',
      excerpt: 'Краткое описание',
      content: 'Полный текст статьи'
    };
    setArticles([...articles, newArticle]);
  };

  const addNewTestimonial = () => {
    const maxId = Math.max(...testimonials.map(t => t.id), 0);
    const newTestimonial = {
      id: maxId + 1,
      client_name: 'Имя клиента',
      city: 'Город',
      text: 'Текст отзыва',
      rating: 5
    };
    setTestimonials([...testimonials, newTestimonial]);
  };

  const addNewTrip = () => {
    const maxId = Math.max(...trips.map(t => t.id), 0);
    const newTrip = {
      id: maxId + 1,
      city: 'Город',
      current_applications: 0,
      required_for_trip: 8,
      status: 'active'
    };
    setTrips([...trips, newTrip]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="Settings" size={20} className="text-primary" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Панель управления</h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCopySQL} className="bg-primary">
              <Icon name="Copy" size={18} className="mr-2" />
              Скопировать SQL
            </Button>
            <Button variant="outline" asChild>
              <a href="/">
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                На сайт
              </a>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Icon name="Info" className="text-blue-600" />
              Как использовать панель
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800 space-y-2">
            <ol className="list-decimal list-inside space-y-2">
              <li>Заполните все нужные поля на разных вкладках</li>
              <li>Нажмите кнопку <strong>"Скопировать SQL"</strong> вверху страницы</li>
              <li>Напишите мне в чат: <strong>"Выполни этот SQL"</strong> и вставьте скопированный текст</li>
              <li>Я выполню запросы, и все изменения появятся на сайте!</li>
            </ol>
          </CardContent>
        </Card>

        <Tabs defaultValue="specialist" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8 h-auto">
            <TabsTrigger value="specialist" className="py-3">
              <Icon name="User" size={18} className="mr-2" />
              <span className="hidden sm:inline">О себе</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="py-3">
              <Icon name="Briefcase" size={18} className="mr-2" />
              <span className="hidden sm:inline">Услуги</span>
            </TabsTrigger>
            <TabsTrigger value="articles" className="py-3">
              <Icon name="BookOpen" size={18} className="mr-2" />
              <span className="hidden sm:inline">Статьи</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="py-3">
              <Icon name="Star" size={18} className="mr-2" />
              <span className="hidden sm:inline">Отзывы</span>
            </TabsTrigger>
            <TabsTrigger value="trips" className="py-3">
              <Icon name="MapPin" size={18} className="mr-2" />
              <span className="hidden sm:inline">Командировки</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="specialist">
            <Card>
              <CardHeader>
                <CardTitle>Данные специалиста</CardTitle>
                <CardDescription>Информация о вас</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Полное имя</Label>
                  <Input 
                    value={specialist.full_name}
                    onChange={(e) => setSpecialist({...specialist, full_name: e.target.value})}
                    placeholder="Фамилия Имя Отчество"
                  />
                </div>

                <div>
                  <Label>Специализация (короткая)</Label>
                  <Input 
                    value={specialist.title}
                    onChange={(e) => setSpecialist({...specialist, title: e.target.value})}
                  />
                </div>

                <div>
                  <Label>Описание о себе</Label>
                  <Textarea 
                    value={specialist.bio}
                    onChange={(e) => setSpecialist({...specialist, bio: e.target.value})}
                    rows={6}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Телефон</Label>
                    <Input 
                      value={specialist.phone}
                      onChange={(e) => setSpecialist({...specialist, phone: e.target.value})}
                      placeholder="+79031575636"
                    />
                  </div>

                  <div>
                    <Label>WhatsApp</Label>
                    <Input 
                      value={specialist.whatsapp}
                      onChange={(e) => setSpecialist({...specialist, whatsapp: e.target.value})}
                      placeholder="+79031575636"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Telegram</Label>
                    <Input 
                      value={specialist.telegram}
                      onChange={(e) => setSpecialist({...specialist, telegram: e.target.value})}
                      placeholder="https://t.me/username"
                    />
                  </div>

                  <div>
                    <Label>Instagram</Label>
                    <Input 
                      value={specialist.instagram}
                      onChange={(e) => setSpecialist({...specialist, instagram: e.target.value})}
                      placeholder="https://instagram.com/username"
                    />
                  </div>
                </div>

                <div>
                  <Label>Ссылка на фото</Label>
                  <Input 
                    value={specialist.photo_url}
                    onChange={(e) => setSpecialist({...specialist, photo_url: e.target.value})}
                    placeholder="https://cdn.poehali.dev/files/..."
                  />
                  {specialist.photo_url && (
                    <div className="mt-4 flex justify-center">
                      <img 
                        src={specialist.photo_url} 
                        alt="Preview" 
                        className="w-48 h-48 object-cover rounded-3xl shadow-lg"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Услуги ({services.length})</h3>
                <Button onClick={addNewService}>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить услугу
                </Button>
              </div>

              {services.map((service, idx) => (
                <Card key={service.id} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">Услуга #{idx + 1}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeService(service.id)}
                      >
                        <Icon name="Trash2" size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Название</Label>
                      <Input 
                        value={service.title}
                        onChange={(e) => {
                          const newServices = [...services];
                          newServices[idx].title = e.target.value;
                          setServices(newServices);
                        }}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Цена (₽)</Label>
                        <Input 
                          type="number"
                          value={service.price}
                          onChange={(e) => {
                            const newServices = [...services];
                            newServices[idx].price = parseInt(e.target.value) || 0;
                            setServices(newServices);
                          }}
                        />
                      </div>
                      <div>
                        <Label>Длительность</Label>
                        <Input 
                          value={service.duration}
                          onChange={(e) => {
                            const newServices = [...services];
                            newServices[idx].duration = e.target.value;
                            setServices(newServices);
                          }}
                          placeholder="60 минут"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Описание</Label>
                      <Textarea 
                        value={service.description}
                        onChange={(e) => {
                          const newServices = [...services];
                          newServices[idx].description = e.target.value;
                          setServices(newServices);
                        }}
                        rows={2}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Категория</Label>
                        <Select 
                          value={service.category} 
                          onValueChange={(val) => {
                            const newServices = [...services];
                            newServices[idx].category = val;
                            setServices(newServices);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="consultation">Консультации</SelectItem>
                            <SelectItem value="diagnostics">Диагностика</SelectItem>
                            <SelectItem value="therapy">Терапия/Занятия</SelectItem>
                            <SelectItem value="package">Абонементы</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Иконка</Label>
                        <Input 
                          value={service.icon}
                          onChange={(e) => {
                            const newServices = [...services];
                            newServices[idx].icon = e.target.value;
                            setServices(newServices);
                          }}
                          placeholder="Heart, Brain, Hand..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="articles">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Статьи ({articles.length})</h3>
                <Button onClick={addNewArticle}>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить статью
                </Button>
              </div>

              {articles.map((article, idx) => (
                <Card key={article.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">Статья #{idx + 1}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setArticles(articles.filter(a => a.id !== article.id))}
                      >
                        <Icon name="Trash2" size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Заголовок</Label>
                      <Input 
                        value={article.title}
                        onChange={(e) => {
                          const newArticles = [...articles];
                          newArticles[idx].title = e.target.value;
                          setArticles(newArticles);
                        }}
                      />
                    </div>

                    <div>
                      <Label>Категория</Label>
                      <Input 
                        value={article.category}
                        onChange={(e) => {
                          const newArticles = [...articles];
                          newArticles[idx].category = e.target.value;
                          setArticles(newArticles);
                        }}
                        placeholder="Для родителей, Методики..."
                      />
                    </div>

                    <div>
                      <Label>Краткое описание</Label>
                      <Textarea 
                        value={article.excerpt}
                        onChange={(e) => {
                          const newArticles = [...articles];
                          newArticles[idx].excerpt = e.target.value;
                          setArticles(newArticles);
                        }}
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label>Полный текст</Label>
                      <Textarea 
                        value={article.content}
                        onChange={(e) => {
                          const newArticles = [...articles];
                          newArticles[idx].content = e.target.value;
                          setArticles(newArticles);
                        }}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="testimonials">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Отзывы ({testimonials.length})</h3>
                <Button onClick={addNewTestimonial}>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить отзыв
                </Button>
              </div>

              {testimonials.map((testimonial, idx) => (
                <Card key={testimonial.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">Отзыв #{idx + 1}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setTestimonials(testimonials.filter(t => t.id !== testimonial.id))}
                      >
                        <Icon name="Trash2" size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Имя клиента</Label>
                        <Input 
                          value={testimonial.client_name}
                          onChange={(e) => {
                            const newTestimonials = [...testimonials];
                            newTestimonials[idx].client_name = e.target.value;
                            setTestimonials(newTestimonials);
                          }}
                        />
                      </div>

                      <div>
                        <Label>Город</Label>
                        <Input 
                          value={testimonial.city}
                          onChange={(e) => {
                            const newTestimonials = [...testimonials];
                            newTestimonials[idx].city = e.target.value;
                            setTestimonials(newTestimonials);
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Текст отзыва</Label>
                      <Textarea 
                        value={testimonial.text}
                        onChange={(e) => {
                          const newTestimonials = [...testimonials];
                          newTestimonials[idx].text = e.target.value;
                          setTestimonials(newTestimonials);
                        }}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Рейтинг (1-5)</Label>
                      <Input 
                        type="number"
                        min="1"
                        max="5"
                        value={testimonial.rating}
                        onChange={(e) => {
                          const newTestimonials = [...testimonials];
                          newTestimonials[idx].rating = parseInt(e.target.value) || 5;
                          setTestimonials(newTestimonials);
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trips">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Командировки ({trips.length})</h3>
                <Button onClick={addNewTrip}>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить город
                </Button>
              </div>

              {trips.map((trip, idx) => (
                <Card key={trip.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">Город #{idx + 1}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setTrips(trips.filter(t => t.id !== trip.id))}
                      >
                        <Icon name="Trash2" size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Название города</Label>
                      <Input 
                        value={trip.city}
                        onChange={(e) => {
                          const newTrips = [...trips];
                          newTrips[idx].city = e.target.value;
                          setTrips(newTrips);
                        }}
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label>Текущие заявки</Label>
                        <Input 
                          type="number"
                          value={trip.current_applications}
                          onChange={(e) => {
                            const newTrips = [...trips];
                            newTrips[idx].current_applications = parseInt(e.target.value) || 0;
                            setTrips(newTrips);
                          }}
                        />
                      </div>

                      <div>
                        <Label>Нужно для поездки</Label>
                        <Input 
                          type="number"
                          value={trip.required_for_trip}
                          onChange={(e) => {
                            const newTrips = [...trips];
                            newTrips[idx].required_for_trip = parseInt(e.target.value) || 8;
                            setTrips(newTrips);
                          }}
                        />
                      </div>

                      <div>
                        <Label>Статус</Label>
                        <Select 
                          value={trip.status} 
                          onValueChange={(val) => {
                            const newTrips = [...trips];
                            newTrips[idx].status = val;
                            setTrips(newTrips);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Идёт набор</SelectItem>
                            <SelectItem value="planned">Запланировано</SelectItem>
                            <SelectItem value="completed">Завершено</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-gray-900 text-green-400">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center justify-between flex-wrap gap-4">
              <span>SQL для выполнения</span>
              <Button onClick={handleCopySQL} variant="outline" className="bg-green-900 text-green-400 border-green-600 hover:bg-green-800">
                <Icon name="Copy" size={18} className="mr-2" />
                Скопировать
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs overflow-x-auto max-h-96 whitespace-pre-wrap">
              {sqlQuery || 'SQL будет сгенерирован при копировании'}
            </pre>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <Icon name="MessageSquare" className="text-green-600" />
              Готово? Отправьте SQL!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-green-800">
            <p className="mb-3">После того как заполнили все поля:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Нажмите кнопку <strong>"Скопировать SQL"</strong> выше</li>
              <li>Напишите мне в чат: <strong>"Выполни этот SQL"</strong></li>
              <li>Вставьте скопированный текст</li>
              <li>Я обновлю базу данных, и всё появится на сайте! ✅</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;