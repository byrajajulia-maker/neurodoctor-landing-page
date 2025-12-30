import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useSiteData } from '@/hooks/useSiteData';

const Admin = () => {
  const { toast } = useToast();
  const { data, loading } = useSiteData('all');
  const [editMode, setEditMode] = useState('');
  
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
  
  useEffect(() => {
    if (data.specialist) {
      setSpecialist(data.specialist);
    }
    if (data.services) {
      setServices(data.services);
    }
  }, [data]);

  const handleSaveSpecialist = () => {
    toast({
      title: "Сохранено!",
      description: "Данные специалиста обновлены (в демо режиме)",
    });
    console.log('Сохранены данные:', specialist);
  };

  const handleServiceChange = (id: number, field: string, value: any) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const handleSaveServices = () => {
    toast({
      title: "Сохранено!",
      description: "Услуги обновлены (в демо режиме)",
    });
    console.log('Сохранены услуги:', services);
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
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="Settings" size={20} className="text-primary" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Панель управления</h1>
          </div>
          <Button variant="outline" asChild>
            <a href="/">
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              На сайт
            </a>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Icon name="Info" className="text-blue-600" />
              Важно!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800 space-y-2">
            <p><strong>Это демо-панель управления.</strong> Изменения пока не сохраняются в базу данных.</p>
            <p>Чтобы изменения применились на реальном сайте, нужно:</p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Скопировать SQL-запросы из консоли браузера (F12)</li>
              <li>Написать мне: "Выполни SQL запросы"</li>
              <li>Я выполню их в базе данных</li>
            </ol>
          </CardContent>
        </Card>

        <Tabs defaultValue="specialist" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="specialist">
              <Icon name="User" size={18} className="mr-2" />
              О себе
            </TabsTrigger>
            <TabsTrigger value="services">
              <Icon name="Briefcase" size={18} className="mr-2" />
              Услуги и цены
            </TabsTrigger>
            <TabsTrigger value="design">
              <Icon name="Palette" size={18} className="mr-2" />
              Дизайн
            </TabsTrigger>
          </TabsList>

          <TabsContent value="specialist">
            <Card>
              <CardHeader>
                <CardTitle>Данные специалиста</CardTitle>
                <CardDescription>Измените информацию о себе</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="full_name">Имя</Label>
                    <Input 
                      id="full_name"
                      value={specialist.full_name}
                      onChange={(e) => setSpecialist({...specialist, full_name: e.target.value})}
                      placeholder="Ваше имя"
                    />
                  </div>

                  <div>
                    <Label htmlFor="title">Специализация</Label>
                    <Input 
                      id="title"
                      value={specialist.title}
                      onChange={(e) => setSpecialist({...specialist, title: e.target.value})}
                      placeholder="Нейродефектолог"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Описание</Label>
                    <Textarea 
                      id="bio"
                      value={specialist.bio}
                      onChange={(e) => setSpecialist({...specialist, bio: e.target.value})}
                      placeholder="Расскажите о себе"
                      rows={5}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input 
                        id="phone"
                        value={specialist.phone}
                        onChange={(e) => setSpecialist({...specialist, phone: e.target.value})}
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>

                    <div>
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input 
                        id="whatsapp"
                        value={specialist.whatsapp}
                        onChange={(e) => setSpecialist({...specialist, whatsapp: e.target.value})}
                        placeholder="+79991234567"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telegram">Telegram</Label>
                      <Input 
                        id="telegram"
                        value={specialist.telegram}
                        onChange={(e) => setSpecialist({...specialist, telegram: e.target.value})}
                        placeholder="https://t.me/username"
                      />
                    </div>

                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input 
                        id="instagram"
                        value={specialist.instagram}
                        onChange={(e) => setSpecialist({...specialist, instagram: e.target.value})}
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="photo_url">Ссылка на фото</Label>
                    <Input 
                      id="photo_url"
                      value={specialist.photo_url}
                      onChange={(e) => setSpecialist({...specialist, photo_url: e.target.value})}
                      placeholder="https://..."
                    />
                    {specialist.photo_url && (
                      <img 
                        src={specialist.photo_url} 
                        alt="Preview" 
                        className="mt-4 w-48 h-48 object-cover rounded-lg shadow"
                      />
                    )}
                  </div>
                </div>

                <Button onClick={handleSaveSpecialist} className="w-full" size="lg">
                  <Icon name="Save" size={18} className="mr-2" />
                  Сохранить изменения
                </Button>

                <Card className="bg-gray-50 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-base">SQL для обновления</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
{`UPDATE specialist_info SET
  full_name = '${specialist.full_name}',
  title = '${specialist.title}',
  bio = '${specialist.bio}',
  phone = '${specialist.phone}',
  whatsapp = '${specialist.whatsapp}',
  telegram = '${specialist.telegram}',
  instagram = '${specialist.instagram}',
  photo_url = '${specialist.photo_url}'
WHERE id = 1;`}
                    </pre>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Услуги и цены</CardTitle>
                <CardDescription>Редактируйте свои услуги</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {services.map((service, idx) => (
                  <Card key={service.id} className="border-l-4 border-l-primary">
                    <CardHeader>
                      <CardTitle className="text-base">Услуга #{idx + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Название</Label>
                        <Input 
                          value={service.title}
                          onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Цена (₽)</Label>
                          <Input 
                            type="number"
                            value={service.price}
                            onChange={(e) => handleServiceChange(service.id, 'price', parseInt(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label>Длительность</Label>
                          <Input 
                            value={service.duration}
                            onChange={(e) => handleServiceChange(service.id, 'duration', e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Описание</Label>
                        <Textarea 
                          value={service.description}
                          onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button onClick={handleSaveServices} className="w-full" size="lg">
                  <Icon name="Save" size={18} className="mr-2" />
                  Сохранить все услуги
                </Button>

                <Card className="bg-gray-50 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-base">SQL запросы</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded overflow-x-auto max-h-96">
{services.map(s => 
`UPDATE services SET
  title = '${s.title}',
  price = ${s.price},
  duration = '${s.duration}',
  description = '${s.description}'
WHERE id = ${s.id};

`).join('')}
                    </pre>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="design">
            <Card>
              <CardHeader>
                <CardTitle>Настройки дизайна</CardTitle>
                <CardDescription>Управление размерами шрифтов и цветами</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="pt-6">
                    <p className="text-yellow-900 flex items-start gap-2">
                      <Icon name="Wrench" className="mt-1 flex-shrink-0" />
                      <span>
                        Настройки дизайна будут доступны в следующей версии. 
                        Пока вы можете попросить меня изменить размеры шрифтов или цвета, 
                        написав: <strong>"Сделай заголовки крупнее"</strong> или <strong>"Измени цвет кнопок на синий"</strong>
                      </span>
                    </p>
                  </CardContent>
                </Card>

                <div className="grid gap-6">
                  <div>
                    <Label className="text-base mb-2 block">Размер основного текста</Label>
                    <div className="flex items-center gap-4">
                      <Input type="range" min="14" max="20" defaultValue="16" className="flex-1" disabled />
                      <span className="text-sm text-gray-600 w-12">16px</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Пока недоступно</p>
                  </div>

                  <div>
                    <Label className="text-base mb-2 block">Размер заголовков</Label>
                    <div className="flex items-center gap-4">
                      <Input type="range" min="24" max="48" defaultValue="32" className="flex-1" disabled />
                      <span className="text-sm text-gray-600 w-12">32px</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Пока недоступно</p>
                  </div>

                  <div>
                    <Label className="text-base mb-2 block">Цвет акцента</Label>
                    <Input type="color" defaultValue="#6366f1" className="h-12 w-full" disabled />
                    <p className="text-sm text-gray-500 mt-2">Пока недоступно</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <Icon name="MessageSquare" className="text-green-600" />
              Нужна помощь?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-green-800">
            <p className="mb-4">Просто напишите мне в чат:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>"Измени цену на консультацию на 3000 рублей"</strong></li>
              <li><strong>"Добавь новую услугу: массаж, 2500 рублей"</strong></li>
              <li><strong>"Поменяй мой телефон на +7 (926) 123-45-67"</strong></li>
              <li><strong>"Сделай заголовки крупнее"</strong></li>
              <li><strong>"Загрузи мое фото"</strong> (пришлите фото в чат)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
