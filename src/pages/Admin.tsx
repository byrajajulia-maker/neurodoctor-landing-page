import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
    photo_url: '',
    diplomas: [] as string[]
  });

  const [services, setServices] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  
  useEffect(() => {
    if (data.specialist) {
      setSpecialist({
        ...data.specialist,
        diplomas: data.specialist.diplomas || []
      });
    }
    if (data.services) setServices(data.services);
    if (data.articles) setArticles(data.articles);
    if (data.testimonials) setTestimonials(data.testimonials);
    if (data.trips) setTrips(data.trips);
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
    sql += `  photo_url = '${specialist.photo_url}',\n`;
    sql += `  diplomas = ARRAY[${specialist.diplomas.map(d => `'${d.replace(/'/g, "''")}'`).join(', ')}]\n`;
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
      sql += `  city = '${(t.city || '').replace(/'/g, "''")}',\n`;
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
    
    return sql;
  };

  const handleCopySQL = async () => {
    const sql = generateSQL();
    
    try {
      await navigator.clipboard.writeText(sql);
      toast({
        title: "✅ SQL скопирован!",
        description: "Теперь отправьте его мне в чат: 'выполни этот sql'",
      });
      
      // Также выводим в консоль для отладки
      console.log('SQL скопирован в буфер обмена:', sql.substring(0, 200) + '...');
    } catch (err) {
      console.error('Ошибка копирования:', err);
      
      // Fallback: показываем SQL в alert для ручного копирования
      const textarea = document.createElement('textarea');
      textarea.value = sql;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        document.execCommand('copy');
        toast({
          title: "✅ SQL скопирован!",
          description: "Использован резервный метод копирования",
        });
      } catch (fallbackErr) {
        toast({
          title: "❌ Не удалось скопировать",
          description: "Попробуйте скопировать вручную из консоли (F12)",
          variant: "destructive"
        });
        console.log('=== SQL ДЛЯ КОПИРОВАНИЯ ===');
        console.log(sql);
        console.log('=== КОНЕЦ SQL ===');
      }
      
      document.body.removeChild(textarea);
    }
  };

  const addDiploma = () => {
    setSpecialist({
      ...specialist,
      diplomas: [...specialist.diplomas, '']
    });
  };

  const updateDiploma = (index: number, value: string) => {
    const newDiplomas = [...specialist.diplomas];
    newDiplomas[index] = value;
    setSpecialist({ ...specialist, diplomas: newDiplomas });
  };

  const removeDiploma = (index: number) => {
    setSpecialist({
      ...specialist,
      diplomas: specialist.diplomas.filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Хедер */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
                <Icon name="Settings" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Панель управления
                </h1>
                <p className="text-sm text-gray-600">Редактирование контента сайта</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCopySQL} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg">
                <Icon name="Copy" size={18} className="mr-2" />
                Скопировать SQL
              </Button>
              <Button variant="outline" asChild className="border-purple-200 hover:bg-purple-50">
                <a href="/">
                  <Icon name="ArrowLeft" size={18} className="mr-2" />
                  На сайт
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Инструкция */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Icon name="Info" className="text-blue-600" />
              Как работать с панелью
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800">
            <ol className="list-decimal list-inside space-y-2">
              <li>Отредактируйте нужные разделы ниже</li>
              <li>Нажмите <strong>"Скопировать SQL"</strong></li>
              <li>Напишите мне: <strong>"выполни этот sql"</strong> + вставьте скопированный текст</li>
              <li>Готово! Изменения появятся на сайте</li>
            </ol>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* РАЗДЕЛ: О специалисте */}
          <Card className="shadow-lg border-purple-100">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Icon name="User" className="text-purple-600" />
                👤 О специалисте
              </CardTitle>
              <CardDescription>
                Информация отображается в шапке сайта и разделе "О себе"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Фото специалиста */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Фото специалиста (URL)</Label>
                  <Input
                    value={specialist.photo_url}
                    onChange={(e) => setSpecialist({ ...specialist, photo_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4">
                  {specialist.photo_url ? (
                    <img src={specialist.photo_url} alt="Превью" className="w-32 h-32 rounded-full object-cover border-4 border-purple-200" />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                      <Icon name="User" size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* ФИО */}
              <div>
                <Label>ФИО специалиста</Label>
                <Input
                  value={specialist.full_name}
                  onChange={(e) => setSpecialist({ ...specialist, full_name: e.target.value })}
                  placeholder="Иванов Иван Иванович"
                  className="text-lg font-semibold"
                />
                <p className="text-sm text-gray-500 mt-1">→ Показывается большим текстом в шапке</p>
              </div>

              {/* Заголовок (специализация) */}
              <div>
                <Label>Главный заголовок (специализация)</Label>
                <Input
                  value={specialist.title}
                  onChange={(e) => setSpecialist({ ...specialist, title: e.target.value })}
                  placeholder="Нейродефектолог, логопед"
                />
                <p className="text-sm text-gray-500 mt-1">→ Отображается под именем специалиста</p>
              </div>

              {/* Био */}
              <div>
                <Label>О себе (био)</Label>
                <Textarea
                  value={specialist.bio}
                  onChange={(e) => setSpecialist({ ...specialist, bio: e.target.value })}
                  placeholder="Расскажите о себе..."
                  rows={6}
                />
                <p className="text-sm text-gray-500 mt-1">→ Раздел "О себе" на главной странице</p>
              </div>

              {/* Контакты */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Телефон</Label>
                  <Input
                    value={specialist.phone}
                    onChange={(e) => setSpecialist({ ...specialist, phone: e.target.value })}
                    placeholder="+7 900 000-00-00"
                  />
                </div>
                <div>
                  <Label>WhatsApp</Label>
                  <Input
                    value={specialist.whatsapp}
                    onChange={(e) => setSpecialist({ ...specialist, whatsapp: e.target.value })}
                    placeholder="+7 900 000-00-00"
                  />
                </div>
                <div>
                  <Label>Telegram (ссылка)</Label>
                  <Input
                    value={specialist.telegram}
                    onChange={(e) => setSpecialist({ ...specialist, telegram: e.target.value })}
                    placeholder="https://t.me/username"
                  />
                </div>
                <div>
                  <Label>Instagram (ссылка)</Label>
                  <Input
                    value={specialist.instagram}
                    onChange={(e) => setSpecialist({ ...specialist, instagram: e.target.value })}
                    placeholder="https://instagram.com/username"
                  />
                </div>
              </div>

              {/* Дипломы */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label className="text-lg">Фотографии дипломов</Label>
                    <p className="text-sm text-gray-500">→ Показываются в разделе "О себе"</p>
                  </div>
                  <Button onClick={addDiploma} variant="outline" size="sm">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить диплом
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {specialist.diplomas.map((diploma, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="flex-1">
                        <Input
                          value={diploma}
                          onChange={(e) => updateDiploma(index, e.target.value)}
                          placeholder="https://cdn.poehali.dev/..."
                        />
                      </div>
                      {diploma && (
                        <div className="w-24 h-24 bg-gray-50 rounded border overflow-hidden">
                          <img src={diploma} alt={`Диплом ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <Button
                        onClick={() => removeDiploma(index)}
                        variant="destructive"
                        size="sm"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  ))}
                  
                  {specialist.diplomas.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded">
                      Нет добавленных дипломов
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* РАЗДЕЛ: Услуги */}
          <Card className="shadow-lg border-green-100">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Briefcase" className="text-green-600" />
                    💼 Услуги и цены
                  </CardTitle>
                  <CardDescription>
                    Раздел "Услуги" на главной странице
                  </CardDescription>
                </div>
                <Button
                  onClick={() => {
                    const maxId = Math.max(...services.map(s => s.id), 0);
                    setServices([...services, {
                      id: maxId + 1,
                      title: 'Новая услуга',
                      price: 3000,
                      duration: '60 минут',
                      description: 'Описание',
                      category: 'therapy',
                      icon: 'Heart'
                    }]);
                  }}
                  variant="outline"
                  size="sm"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить услугу
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {services.map((service, idx) => (
                <Card key={service.id} className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-lg">Услуга #{idx + 1}</h3>
                      <Button
                        onClick={() => setServices(services.filter(s => s.id !== service.id))}
                        variant="destructive"
                        size="sm"
                      >
                        <Icon name="Trash2" size={16} className="mr-2" />
                        Удалить
                      </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
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
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label>Цена (₽)</Label>
                          <Input
                            type="number"
                            value={service.price}
                            onChange={(e) => {
                              const newServices = [...services];
                              newServices[idx].price = parseInt(e.target.value);
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
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <Label>Описание</Label>
                        <Textarea
                          value={service.description}
                          onChange={(e) => {
                            const newServices = [...services];
                            newServices[idx].description = e.target.value;
                            setServices(newServices);
                          }}
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* РАЗДЕЛ: Интенсивы */}
          <Card className="shadow-lg border-orange-100">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MapPin" className="text-orange-600" />
                    🗺️ Интенсивы в вашем городе
                  </CardTitle>
                  <CardDescription>
                    Раздел с командировками и набором заявок
                  </CardDescription>
                </div>
                <Button
                  onClick={() => {
                    const maxId = Math.max(...trips.map(t => t.id), 0);
                    setTrips([...trips, {
                      id: maxId + 1,
                      city: 'Город',
                      current_applications: 0,
                      required_for_trip: 6,
                      status: 'active'
                    }]);
                  }}
                  variant="outline"
                  size="sm"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить город
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {trips.map((trip, idx) => (
                <Card key={trip.id} className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-lg">Город #{idx + 1}</h3>
                      <Button
                        onClick={() => setTrips(trips.filter(t => t.id !== trip.id))}
                        variant="destructive"
                        size="sm"
                      >
                        <Icon name="Trash2" size={16} className="mr-2" />
                        Удалить
                      </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label>Город</Label>
                        <Input
                          value={trip.city}
                          onChange={(e) => {
                            const newTrips = [...trips];
                            newTrips[idx].city = e.target.value;
                            setTrips(newTrips);
                          }}
                        />
                      </div>
                      <div>
                        <Label>Заявок собрано</Label>
                        <Input
                          type="number"
                          value={trip.current_applications}
                          onChange={(e) => {
                            const newTrips = [...trips];
                            newTrips[idx].current_applications = parseInt(e.target.value);
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
                            newTrips[idx].required_for_trip = parseInt(e.target.value);
                            setTrips(newTrips);
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Превью */}
                    <div className="mt-4 p-4 bg-white rounded-lg border-2 border-dashed">
                      <p className="text-sm text-gray-500 mb-2">Превью карточки:</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-lg">{trip.city}</p>
                          <p className="text-sm text-gray-600">
                            {trip.current_applications} / {trip.required_for_trip} заявок
                          </p>
                        </div>
                        <div className="text-right">
                          {trip.current_applications >= trip.required_for_trip ? (
                            <span className="text-green-600 font-semibold">✓ Набрано!</span>
                          ) : (
                            <span className="text-orange-600">В процессе сбора</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* РАЗДЕЛ: Отзывы */}
          <Card className="shadow-lg border-pink-100">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MessageCircle" className="text-pink-600" />
                    💬 Отзывы клиентов
                  </CardTitle>
                  <CardDescription>
                    Раздел "Отзывы" на главной странице
                  </CardDescription>
                </div>
                <Button
                  onClick={() => {
                    const maxId = Math.max(...testimonials.map(t => t.id), 0);
                    setTestimonials([...testimonials, {
                      id: maxId + 1,
                      client_name: 'Имя клиента',
                      city: 'Город',
                      text: 'Текст отзыва',
                      rating: 5
                    }]);
                  }}
                  variant="outline"
                  size="sm"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить отзыв
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {testimonials.map((testimonial, idx) => (
                <Card key={testimonial.id} className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-lg">Отзыв #{idx + 1}</h3>
                      <Button
                        onClick={() => setTestimonials(testimonials.filter(t => t.id !== testimonial.id))}
                        variant="destructive"
                        size="sm"
                      >
                        <Icon name="Trash2" size={16} className="mr-2" />
                        Удалить
                      </Button>
                    </div>
                    
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
                          value={testimonial.city || ''}
                          onChange={(e) => {
                            const newTestimonials = [...testimonials];
                            newTestimonials[idx].city = e.target.value;
                            setTestimonials(newTestimonials);
                          }}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Текст отзыва</Label>
                        <Textarea
                          value={testimonial.text}
                          onChange={(e) => {
                            const newTestimonials = [...testimonials];
                            newTestimonials[idx].text = e.target.value;
                            setTestimonials(newTestimonials);
                          }}
                          rows={4}
                        />
                      </div>
                    </div>
                    
                    {/* Превью */}
                    <div className="mt-4 p-4 bg-white rounded-lg border-2 border-dashed">
                      <p className="text-sm text-gray-500 mb-2">Превью отзыва:</p>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                          <Icon name="User" size={20} className="text-pink-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{testimonial.client_name}</p>
                          {testimonial.city && <p className="text-sm text-gray-500">{testimonial.city}</p>}
                          <p className="text-sm mt-2 italic">"{testimonial.text}"</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* РАЗДЕЛ: Статьи */}
          <Card className="shadow-lg border-blue-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="FileText" className="text-blue-600" />
                    📚 Полезные статьи
                  </CardTitle>
                  <CardDescription>
                    Раздел "Статьи" на главной странице
                  </CardDescription>
                </div>
                <Button
                  onClick={() => {
                    const maxId = Math.max(...articles.map(a => a.id), 0);
                    setArticles([...articles, {
                      id: maxId + 1,
                      title: 'Новая статья',
                      category: 'Для родителей',
                      excerpt: 'Краткое описание',
                      content: 'Текст статьи'
                    }]);
                  }}
                  variant="outline"
                  size="sm"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить статью
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {articles.map((article, idx) => (
                <Card key={article.id} className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-lg">Статья #{idx + 1}</h3>
                      <Button
                        onClick={() => setArticles(articles.filter(a => a.id !== article.id))}
                        variant="destructive"
                        size="sm"
                      >
                        <Icon name="Trash2" size={16} className="mr-2" />
                        Удалить
                      </Button>
                    </div>
                    
                    <div className="grid gap-4">
                      <div className="grid md:grid-cols-2 gap-4">
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
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Краткое описание (excerpt)</Label>
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Плавающая кнопка сохранения */}
        <div className="fixed bottom-8 right-8">
          <Button
            onClick={handleCopySQL}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-2xl h-16 px-8 rounded-full"
          >
            <Icon name="Copy" size={24} className="mr-3" />
            <span className="text-lg font-semibold">Скопировать SQL</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;