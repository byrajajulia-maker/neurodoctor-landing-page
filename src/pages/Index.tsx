import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="Brain" size={28} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Нейродефектолог</h1>
              <p className="text-sm text-gray-600">Помощь особенным детям</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="text-gray-700 hover:text-primary transition-colors">Услуги</a>
            <a href="#about" className="text-gray-700 hover:text-primary transition-colors">О специалисте</a>
            <a href="#materials" className="text-gray-700 hover:text-primary transition-colors">Материалы</a>
            <a href="#trips" className="text-gray-700 hover:text-primary transition-colors">Командировки</a>
            <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Контакты</a>
          </nav>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://t.me/yourchannel" target="_blank" rel="noopener noreferrer">
                <Icon name="Send" size={20} />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                <Icon name="Instagram" size={20} />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-secondary">Профессиональная помощь</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Нейродефектолог для вашего ребёнка
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Индивидуальный подход к развитию и коррекции особенностей детей. 
                Современные методики, подтверждённые сертификаты, многолетний опыт работы.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <a href="#contact">Записаться на приём</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://wa.me/79999999999" target="_blank" rel="noopener noreferrer">
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            <div className="animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/a166d6d7-2fe8-428d-8ea8-cfa2f49ef647/files/dc1855c0-ee5a-4d26-ba95-ae790a50eab5.jpg"
                alt="Нейродефектолог" 
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Услуги и цены</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Комплексный подход к развитию ребёнка с учётом индивидуальных особенностей
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in border-2 hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="ClipboardList" size={24} className="text-primary" />
                </div>
                <CardTitle>Первичная консультация</CardTitle>
                <CardDescription>Знакомство, сбор анамнеза, первичная оценка</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">2 500 ₽</div>
                <p className="text-sm text-gray-600">Длительность: 60 минут</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in border-2 hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Icon name="FileSearch" size={24} className="text-secondary" />
                </div>
                <CardTitle>Комплексная диагностика</CardTitle>
                <CardDescription>Полное нейропсихологическое обследование</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary mb-2">5 000 ₽</div>
                <p className="text-sm text-gray-600">Длительность: 90-120 минут</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in border-2 hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Users" size={24} className="text-primary" />
                </div>
                <CardTitle>Коррекционное занятие</CardTitle>
                <CardDescription>Индивидуальные развивающие занятия</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">3 000 ₽</div>
                <p className="text-sm text-gray-600">Длительность: 45-60 минут</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-3xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Icon name="Sparkles" size={20} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg mb-2">Пакетные предложения</h3>
                    <p className="text-gray-700">
                      При оплате курса из 10 занятий — скидка 10%. 
                      Абонемент на месяц (8 занятий) — 22 000 ₽.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center animate-fade-in">
              О специалисте
            </h2>
            
            <Card className="mb-8 animate-fade-in">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Icon name="GraduationCap" className="text-primary" />
                      Образование
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-secondary mt-1 flex-shrink-0" />
                        <span>Высшее дефектологическое образование</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-secondary mt-1 flex-shrink-0" />
                        <span>Специализация: нейропсихология детского возраста</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-secondary mt-1 flex-shrink-0" />
                        <span>Повышение квалификации по коррекции РАС</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Award" className="text-primary" />
                      Опыт работы
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-secondary mt-1 flex-shrink-0" />
                        <span>Более 7 лет практической работы</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-secondary mt-1 flex-shrink-0" />
                        <span>Более 200 детей с положительной динамикой</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-secondary mt-1 flex-shrink-0" />
                        <span>Работа с ЗПР, ЗПРР, РАС, ДЦП, синдромом Дауна</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileCheck" className="text-primary" />
                  Сертификаты и документы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Все документы об образовании и сертификаты повышения квалификации доступны по запросу. 
                  Работаю по официальному договору на оказание услуг.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Диплом педагога-дефектолога</Badge>
                  <Badge variant="secondary">Сертификат нейропсихолога</Badge>
                  <Badge variant="secondary">Курсы по АВА-терапии</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="materials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center animate-fade-in">
              Полезные материалы
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Информация для родителей о развитии и коррекции особенностей
            </p>

            <Accordion type="single" collapsible className="w-full space-y-4">
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
                    <Icon name="Heart" className="text-primary" />
                    <span className="font-semibold">Как проходят занятия?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-4">
                  Занятия проводятся индивидуально в игровой форме. Используются специальные пособия, 
                  сенсорное оборудование, нейропсихологические игры. Каждое занятие адаптируется под 
                  текущее состояние и настроение ребёнка. Родители получают рекомендации для домашних занятий.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-lg px-6 bg-white shadow-sm">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" className="text-primary" />
                    <span className="font-semibold">Сколько нужно занятий?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-4">
                  Длительность коррекционного курса индивидуальна. В среднем для заметной динамики требуется 
                  от 3 до 6 месяцев регулярных занятий (2-3 раза в неделю). После диагностики составляется 
                  индивидуальный план с примерными сроками.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section id="trips" className="py-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <Badge className="mb-4 bg-secondary">Выездные консультации</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Командировки</h2>
              <p className="text-gray-600">
                Возможность получить помощь специалиста в вашем городе
              </p>
            </div>

            <Card className="mb-8 animate-fade-in border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MapPin" className="text-primary" />
                  Условия выезда
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Users" size={16} className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Минимум 8 заявок</h4>
                    <p className="text-gray-600 text-sm">
                      При наборе 8 и более заявок из одного города организую выезд на 3 недели
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Calendar" size={16} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Интенсивный курс</h4>
                    <p className="text-gray-600 text-sm">
                      За 3 недели проводятся диагностика и серия коррекционных занятий с каждым ребёнком
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="MessageSquare" size={16} className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Обратная связь</h4>
                    <p className="text-gray-600 text-sm">
                      Родители получают подробные рекомендации и план дальнейших действий
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Оставить заявку на командировку</CardTitle>
                <CardDescription>
                  Укажите ваш город и контакты. Мы свяжемся с вами при наборе группы.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTripSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваш город *</label>
                    <Input
                      placeholder="Например: Казань"
                      value={tripForm.city}
                      onChange={(e) => setTripForm({...tripForm, city: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваше имя *</label>
                    <Input
                      placeholder="Как к вам обращаться?"
                      value={tripForm.name}
                      onChange={(e) => setTripForm({...tripForm, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон *</label>
                    <Input
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={tripForm.phone}
                      onChange={(e) => setTripForm({...tripForm, phone: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Комментарий</label>
                    <Textarea
                      placeholder="Дополнительная информация (возраст ребёнка, особенности и т.д.)"
                      value={tripForm.comment}
                      onChange={(e) => setTripForm({...tripForm, comment: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center animate-fade-in">
              Контакты и запись
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Свяжитесь со мной</CardTitle>
                  <CardDescription>Выберите удобный способ связи</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Phone" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Телефон</div>
                      <a href="tel:+79999999999" className="font-semibold hover:text-primary">
                        +7 (999) 999-99-99
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Icon name="Mail" size={20} className="text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Email</div>
                      <a href="mailto:specialist@example.com" className="font-semibold hover:text-primary">
                        specialist@example.com
                      </a>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Button className="w-full bg-[#25D366] hover:bg-[#128C7E]" asChild>
                      <a href="https://wa.me/79999999999" target="_blank" rel="noopener noreferrer">
                        <Icon name="MessageCircle" size={18} className="mr-2" />
                        Написать в WhatsApp
                      </a>
                    </Button>

                    <Button variant="outline" className="w-full" asChild>
                      <a href="https://t.me/username" target="_blank" rel="noopener noreferrer">
                        <Icon name="Send" size={18} className="mr-2" />
                        Написать в Telegram
                      </a>
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Share2" size={18} className="text-primary" />
                      Мои каналы
                    </h4>
                    <div className="space-y-2">
                      <a 
                        href="https://t.me/yourchannel" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                      >
                        <Icon name="Send" size={16} />
                        <span>Telegram-канал</span>
                      </a>
                      <a 
                        href="https://instagram.com/yourprofile" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                      >
                        <Icon name="Instagram" size={16} />
                        <span>Instagram</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Записаться на приём</CardTitle>
                  <CardDescription>Оставьте заявку, и я свяжусь с вами</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Ваше имя *</label>
                      <Input
                        placeholder="Как к вам обращаться?"
                        value={appointmentForm.name}
                        onChange={(e) => setAppointmentForm({...appointmentForm, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Телефон *</label>
                      <Input
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={appointmentForm.phone}
                        onChange={(e) => setAppointmentForm({...appointmentForm, phone: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Сообщение</label>
                      <Textarea
                        placeholder="Опишите кратко ситуацию и что вас беспокоит..."
                        value={appointmentForm.message}
                        onChange={(e) => setAppointmentForm({...appointmentForm, message: e.target.value})}
                        rows={4}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Отправить заявку
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name="Brain" size={24} className="text-primary" />
                </div>
                <span className="font-bold text-white text-lg">Нейродефектолог</span>
              </div>
              <p className="text-sm text-gray-400">
                Профессиональная помощь в развитии и коррекции особенностей детей
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="hover:text-primary transition-colors">Услуги</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">О специалисте</a></li>
                <li><a href="#materials" className="hover:text-primary transition-colors">Материалы</a></li>
                <li><a href="#trips" className="hover:text-primary transition-colors">Командировки</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <a href="tel:+79999999999" className="hover:text-primary transition-colors">
                    +7 (999) 999-99-99
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <a href="mailto:specialist@example.com" className="hover:text-primary transition-colors">
                    specialist@example.com
                  </a>
                </li>
              </ul>
              <div className="flex gap-3 mt-4">
                <a 
                  href="https://t.me/yourchannel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-800 hover:bg-primary transition-colors flex items-center justify-center"
                >
                  <Icon name="Send" size={16} />
                </a>
                <a 
                  href="https://instagram.com/yourprofile" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-800 hover:bg-primary transition-colors flex items-center justify-center"
                >
                  <Icon name="Instagram" size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Все права защищены
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
