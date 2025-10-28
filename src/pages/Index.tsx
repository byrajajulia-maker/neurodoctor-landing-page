import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useSiteData } from '@/hooks/useSiteData';

const Index = () => {
  const { toast } = useToast();
  const { data, loading } = useSiteData('all');
  const [activeTab, setActiveTab] = useState('home');
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [tripForm, setTripForm] = useState({
    city: '',
    name: '',
    phone: '',
    comment: ''
  });

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setAppointmentForm({ name: '', phone: '', message: '' });
  };

  const handleTripSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка на командировку принята!",
      description: "Спасибо! Мы учли ваш город в планировании выезда.",
    });
    setTripForm({ city: '', name: '', phone: '', comment: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  const specialist = data.specialist;
  const services = data.services || [];
  const testimonials = data.testimonials || [];
  const trips = data.trips || [];
  const articles = data.articles || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="Brain" size={28} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{specialist?.full_name || 'Нейродефектолог'}</h1>
              <p className="text-sm text-gray-600">{specialist?.title || 'Помощь особенным детям'}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {specialist?.telegram && (
              <Button variant="ghost" size="icon" asChild>
                <a href={specialist.telegram} target="_blank" rel="noopener noreferrer">
                  <Icon name="Send" size={20} />
                </a>
              </Button>
            )}
            {specialist?.instagram && (
              <Button variant="ghost" size="icon" asChild>
                <a href={specialist.instagram} target="_blank" rel="noopener noreferrer">
                  <Icon name="Instagram" size={20} />
                </a>
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7 mb-8 h-auto">
            <TabsTrigger value="home" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3">
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3">
              <Icon name="Briefcase" size={18} className="mr-2" />
              Услуги
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3">
              <Icon name="User" size={18} className="mr-2" />
              О специалисте
            </TabsTrigger>
            <TabsTrigger value="articles" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Статьи
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3">
              <Icon name="Star" size={18} className="mr-2" />
              Отзывы
            </TabsTrigger>
            <TabsTrigger value="trips" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3">
              <Icon name="MapPin" size={18} className="mr-2" />
              Командировки
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3">
              <Icon name="Phone" size={18} className="mr-2" />
              Контакты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="animate-fade-in">
            <section className="relative py-12 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="animate-fade-in px-6">
                    <Badge className="mb-4 bg-secondary">Профессиональная помощь</Badge>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                      {specialist?.title || 'Нейродефектолог для вашего ребёнка'}
                    </h2>
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                      {specialist?.bio || 'Индивидуальный подход к развитию и коррекции особенностей детей. Современные методики, подтверждённые сертификаты, многолетний опыт работы.'}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => setActiveTab('contact')}>
                        Записаться на приём
                      </Button>
                      {specialist?.whatsapp && (
                        <Button size="lg" variant="outline" asChild>
                          <a href={`https://wa.me/${specialist.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                            <Icon name="MessageCircle" size={20} className="mr-2" />
                            WhatsApp
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="animate-scale-in px-6">
                    <img 
                      src={specialist?.photo_url || "https://cdn.poehali.dev/projects/a166d6d7-2fe8-428d-8ea8-cfa2f49ef647/files/dc1855c0-ee5a-4d26-ba95-ae790a50eab5.jpg"}
                      alt={specialist?.full_name || "Нейродефектолог"} 
                      className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                    />
                  </div>
                </div>

                <div className="mt-16 px-6">
                  <h3 className="text-2xl font-bold text-center mb-8">Полезные материалы</h3>
                  <Accordion type="single" collapsible className="w-full space-y-4 max-w-4xl mx-auto">
                    <AccordionItem value="item-1" className="border rounded-lg px-6 bg-white shadow-sm">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                          <Icon name="BookOpen" className="text-primary" />
                          <span className="font-semibold">Что такое нейродефектология?</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 pt-4">
                        Нейродефектология — это междисциплинарная область, объединяющая знания нейропсихологии, 
                        коррекционной педагогики и дефектологии. Специалист работает с детьми, имеющими различные 
                        нарушения развития, используя методы, основанные на понимании работы мозга.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border rounded-lg px-6 bg-white shadow-sm">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                          <Icon name="Target" className="text-primary" />
                          <span className="font-semibold">Когда обращаться к специалисту?</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 pt-4">
                        <ul className="space-y-2">
                          <li>• Задержка речевого развития</li>
                          <li>• Проблемы с концентрацией внимания</li>
                          <li>• Трудности в обучении и усвоении материала</li>
                          <li>• Нарушения поведения</li>
                          <li>• Диагностированные ЗПР, ЗПРР, РАС, СДВГ</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border rounded-lg px-6 bg-white shadow-sm">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                          <Icon name="Lightbulb" className="text-primary" />
                          <span className="font-semibold">Как проходит работа?</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 pt-4">
                        Работа начинается с диагностики состояния ребёнка. На основе результатов разрабатывается 
                        индивидуальная программа занятий. Занятия проводятся в игровой форме с учётом возрастных 
                        особенностей и интересов ребёнка.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="services" className="animate-fade-in">
            <section className="py-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Мои услуги</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Профессиональная помощь детям с особенностями развития
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <Card key={service.id} className="hover:shadow-lg transition-shadow border-t-4 border-t-primary">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon name={service.icon as any} size={24} className="text-primary" />
                        </div>
                        <Badge variant="secondary">{service.category}</Badge>
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-2xl font-bold text-primary">{service.price} ₽</div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Icon name="Clock" size={16} />
                          {service.duration}
                        </div>
                      </div>
                      <Button className="w-full" onClick={() => setActiveTab('contact')}>
                        Записаться
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Info" className="text-primary" />
                    Важная информация
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-700">
                  <p className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <span>Первичная консультация включает диагностику и составление индивидуального плана</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <span>Все занятия проводятся в комфортной обстановке с использованием специализированных материалов</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <span>Возможен выезд специалиста на дом в пределах города</span>
                  </p>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="about" className="animate-fade-in">
            <section className="py-8">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">О специалисте</h2>
                  <img 
                    src={specialist?.photo_url || "https://cdn.poehali.dev/projects/a166d6d7-2fe8-428d-8ea8-cfa2f49ef647/files/dc1855c0-ee5a-4d26-ba95-ae790a50eab5.jpg"}
                    alt={specialist?.full_name || "Специалист"} 
                    className="rounded-2xl shadow-xl w-full object-cover mb-6"
                  />
                  
                  <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-none">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                        <Icon name="Award" className="text-primary" />
                        Квалификация
                      </h3>
                      <ul className="space-y-3 text-gray-700">
                        {specialist?.specializations && specialist.specializations.length > 0 ? (
                          specialist.specializations.map((spec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Icon name="CheckCircle" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                              <span>{spec}</span>
                            </li>
                          ))
                        ) : (
                          <>
                            <li className="flex items-start gap-2">
                              <Icon name="CheckCircle" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                              <span>Высшее дефектологическое образование</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Icon name="CheckCircle" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                              <span>Сертификаты по нейропсихологии</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <div className="grid grid-cols-1 gap-6 mb-8">
                    <Card className="border-l-4 border-l-primary">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon name="Briefcase" size={24} className="text-primary" />
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-primary">{specialist?.experience_years || 10}+</div>
                            <div className="text-sm text-gray-600">лет опыта</div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                    </Card>

                    <Card className="border-l-4 border-l-secondary">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                            <Icon name="Users" size={24} className="text-secondary" />
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-secondary">{specialist?.clients_count || 500}+</div>
                            <div className="text-sm text-gray-600">довольных клиентов</div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                    </Card>

                    <Card className="border-l-4 border-l-primary">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon name="TrendingUp" size={24} className="text-primary" />
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-primary">{specialist?.success_rate || 95}%</div>
                            <div className="text-sm text-gray-600">успешных случаев</div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Heart" className="text-primary" />
                        Подход к работе
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-700">
                      <p>
                        В своей работе я использую комплексный подход, сочетающий современные методики 
                        нейропсихологии и классической дефектологии.
                      </p>
                      <p>
                        Каждый ребёнок уникален, поэтому программа занятий разрабатывается индивидуально 
                        с учётом особенностей развития, возраста и интересов ребёнка.
                      </p>
                      <p>
                        Я верю, что терпение, профессионализм и любовь к своему делу помогают добиваться 
                        отличных результатов в работе с особенными детьми.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="mt-6 bg-primary text-white">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                        <Icon name="Target" />
                        Миссия
                      </h3>
                      <p className="text-white/90">
                        Помочь каждому ребёнку раскрыть свой потенциал и адаптироваться в обществе, 
                        используя современные методы коррекции и индивидуальный подход.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="articles" className="animate-fade-in">
            <section className="py-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Полезные статьи</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Практические советы и информация о методиках работы
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-all cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{article.category}</Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(article.publish_date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <CardTitle className="line-clamp-2 text-lg">{article.title}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" className="w-full group">
                        Читать далее
                        <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {articles.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <Icon name="BookOpen" size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">Статьи скоро появятся</p>
                  </CardContent>
                </Card>
              )}
            </section>
          </TabsContent>

          <TabsContent value="reviews" className="animate-fade-in">
            <section className="py-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Отзывы родителей</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Истории семей, которым мы помогли
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {testimonial.photo_url && (
                            <img 
                              src={testimonial.photo_url} 
                              alt={testimonial.client_name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          )}
                          <div>
                            <CardTitle className="text-lg">{testimonial.client_name}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <Icon name="MapPin" size={14} />
                              {testimonial.city}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Icon 
                              key={i}
                              name="Star" 
                              size={16} 
                              className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{testimonial.text}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Icon name="Calendar" size={14} />
                        {new Date(testimonial.date).toLocaleDateString('ru-RU')}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-none">
                <CardHeader className="text-center">
                  <CardTitle>Хотите поделиться своим опытом?</CardTitle>
                  <CardDescription>
                    Мы будем рады узнать о ваших успехах и поделиться ими с другими семьями
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button size="lg" onClick={() => setActiveTab('contact')}>
                    Оставить отзыв
                  </Button>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="trips" className="animate-fade-in">
            <section className="py-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Командировки в города</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Я готова приехать в ваш город для проведения консультаций и занятий. 
                  Оставьте заявку, и мы сообщим, когда планируется поездка в ваш регион.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {trips.map((trip) => (
                  <Card key={trip.id} className={`border-t-4 ${trip.status === 'planned' ? 'border-t-primary' : trip.status === 'confirmed' ? 'border-t-green-500' : 'border-t-gray-300'}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Icon name="MapPin" className="text-primary" />
                          {trip.city}
                        </CardTitle>
                        <Badge 
                          variant={trip.status === 'confirmed' ? 'default' : 'secondary'}
                          className={trip.status === 'confirmed' ? 'bg-green-500' : ''}
                        >
                          {trip.status === 'confirmed' ? 'Подтверждено' : trip.status === 'planned' ? 'Планируется' : 'Сбор заявок'}
                        </Badge>
                      </div>
                      {trip.trip_dates && (
                        <CardDescription className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          {trip.trip_dates}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Заявок собрано:</span>
                          <span className="font-bold text-primary">
                            {trip.current_applications} / {trip.required_for_trip}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${Math.min((trip.current_applications / trip.required_for_trip) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <Button 
                        className="w-full" 
                        variant={trip.status === 'confirmed' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('contact')}
                      >
                        {trip.status === 'confirmed' ? 'Записаться' : 'Оставить заявку'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Send" className="text-primary" />
                    Заявка на командировку
                  </CardTitle>
                  <CardDescription>
                    Укажите ваш город и контактные данные. Мы свяжемся с вами, когда будем планировать поездку.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTripSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Ваш город</label>
                      <Input 
                        placeholder="Например, Москва"
                        value={tripForm.city}
                        onChange={(e) => setTripForm({ ...tripForm, city: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Ваше имя</label>
                      <Input 
                        placeholder="Как к вам обращаться"
                        value={tripForm.name}
                        onChange={(e) => setTripForm({ ...tripForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Телефон</label>
                      <Input 
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={tripForm.phone}
                        onChange={(e) => setTripForm({ ...tripForm, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Комментарий (необязательно)</label>
                      <Textarea 
                        placeholder="Дополнительная информация или пожелания"
                        value={tripForm.comment}
                        onChange={(e) => setTripForm({ ...tripForm, comment: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Отправить заявку
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="contact" className="animate-fade-in">
            <section className="py-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Свяжитесь со мной</h2>
                  
                  <div className="space-y-6 mb-8">
                    {specialist?.phone && (
                      <Card className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                        <CardContent className="flex items-center gap-4 pt-6">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon name="Phone" size={24} className="text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">Телефон</div>
                            <a href={`tel:${specialist.phone}`} className="text-primary hover:underline">
                              {specialist.phone}
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {specialist?.whatsapp && (
                      <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
                        <CardContent className="flex items-center gap-4 pt-6">
                          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                            <Icon name="MessageCircle" size={24} className="text-green-500" />
                          </div>
                          <div>
                            <div className="font-semibold">WhatsApp</div>
                            <a 
                              href={`https://wa.me/${specialist.whatsapp.replace(/\D/g, '')}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-green-500 hover:underline"
                            >
                              {specialist.whatsapp}
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {specialist?.telegram && (
                      <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                        <CardContent className="flex items-center gap-4 pt-6">
                          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                            <Icon name="Send" size={24} className="text-blue-500" />
                          </div>
                          <div>
                            <div className="font-semibold">Telegram</div>
                            <a 
                              href={specialist.telegram} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Написать в Telegram
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {specialist?.instagram && (
                      <Card className="border-l-4 border-l-pink-500 hover:shadow-md transition-shadow">
                        <CardContent className="flex items-center gap-4 pt-6">
                          <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                            <Icon name="Instagram" size={24} className="text-pink-500" />
                          </div>
                          <div>
                            <div className="font-semibold">Instagram</div>
                            <a 
                              href={specialist.instagram} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-pink-500 hover:underline"
                            >
                              Подписаться
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-none">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Icon name="Clock" className="text-primary" />
                        График работы
                      </h3>
                      <div className="space-y-2 text-gray-700">
                        <p>Понедельник - Пятница: 9:00 - 19:00</p>
                        <p>Суббота: 10:00 - 16:00</p>
                        <p>Воскресенье: выходной</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Calendar" className="text-primary" />
                        Записаться на консультацию
                      </CardTitle>
                      <CardDescription>
                        Заполните форму, и я свяжусь с вами в ближайшее время для уточнения деталей
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Ваше имя</label>
                          <Input 
                            placeholder="Как к вам обращаться"
                            value={appointmentForm.name}
                            onChange={(e) => setAppointmentForm({ ...appointmentForm, name: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Телефон</label>
                          <Input 
                            type="tel"
                            placeholder="+7 (999) 123-45-67"
                            value={appointmentForm.phone}
                            onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Сообщение</label>
                          <Textarea 
                            placeholder="Расскажите о причине обращения и возрасте ребёнка"
                            value={appointmentForm.message}
                            onChange={(e) => setAppointmentForm({ ...appointmentForm, message: e.target.value })}
                            rows={4}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full" size="lg">
                          Отправить заявку
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Icon name="Brain" className="text-primary" />
                {specialist?.full_name || 'Нейродефектолог'}
              </h3>
              <p className="text-gray-400">
                {specialist?.title || 'Профессиональная помощь детям с особенностями развития'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <div className="space-y-2 text-gray-400">
                <button onClick={() => setActiveTab('home')} className="block hover:text-white transition-colors">Главная</button>
                <button onClick={() => setActiveTab('services')} className="block hover:text-white transition-colors">Услуги</button>
                <button onClick={() => setActiveTab('about')} className="block hover:text-white transition-colors">О специалисте</button>
                <button onClick={() => setActiveTab('articles')} className="block hover:text-white transition-colors">Статьи</button>
                <button onClick={() => setActiveTab('reviews')} className="block hover:text-white transition-colors">Отзывы</button>
                <button onClick={() => setActiveTab('trips')} className="block hover:text-white transition-colors">Командировки</button>
                <button onClick={() => setActiveTab('contact')} className="block hover:text-white transition-colors">Контакты</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-3 text-gray-400">
                {specialist?.phone && (
                  <a href={`tel:${specialist.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                    <Icon name="Phone" size={18} />
                    {specialist.phone}
                  </a>
                )}
                {specialist?.location && (
                  <p className="flex items-center gap-2">
                    <Icon name="MapPin" size={18} />
                    {specialist.location}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {specialist?.full_name || 'Нейродефектолог'}. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;