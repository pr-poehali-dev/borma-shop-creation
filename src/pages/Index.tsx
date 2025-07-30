import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  description: string;
  instructions: string[];
  features: string[];
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: "Морилка на водной основе H2O",
      price: 1890,
      oldPrice: 2100,
      category: "Морилки",
      image: "/img/259f05f5-e4dd-4caf-a57b-b098b5b43ca4.jpg",
      description: "Профессиональная морилка на водной основе для глубокого проникновения в древесину. Экологически чистая, не имеет запаха.",
      instructions: [
        "Тщательно очистите поверхность от пыли и старых покрытий",
        "Нанесите морилку кистью вдоль волокон дерева равномерным слоем",
        "Дайте высохнуть 2-4 часа при температуре 18-20°C",
        "При необходимости нанесите второй слой после полного высыхания первого",
        "Для лучшего результата используйте грунтовку BORMA FONDO"
      ],
      features: ["Без запаха", "Глубокое проникновение", "Экологически чистая", "Быстрое высыхание"]
    },
    {
      id: 2,
      name: "Лак полиуретановый HOLZLACK глянцевый",
      price: 2850,
      category: "Лаки",
      image: "/img/b090ec4c-5d96-42ad-8246-cc69c45f803d.jpg",
      description: "Высококачественный полиуретановый лак с превосходной защитой от износа. Идеален для паркета и мебели.",
      instructions: [
        "Подготовьте поверхность шлифовкой абразивом зернистостью P220",
        "Удалите всю пыль сухой безворсовой тканью",
        "Нанесите тонкий равномерный слой кистью, валиком или распылителем",
        "Время высыхания между слоями 4-6 часов",
        "Промежуточная шлифовка P320 между слоями",
        "Нанесите 2-3 слоя для оптимального результата"
      ],
      features: ["Высокая износостойкость", "UV защита", "Быстрое высыхание", "Глянцевый блеск"]
    },
    {
      id: 3,
      name: "Грунтовка изолирующая FONDO",
      price: 1680,
      category: "Грунтовки",
      image: "/img/259f05f5-e4dd-4caf-a57b-b098b5b43ca4.jpg",
      description: "Универсальная изолирующая грунтовка для подготовки древесины. Предотвращает появление пятен и неровностей.",
      instructions: [
        "Очистите поверхность от грязи, жира и старых покрытий",
        "При необходимости отшлифуйте поверхность",
        "Нанесите грунтовку равномерным тонким слоем",
        "Время высыхания 1-2 часа при комнатной температуре",
        "Слегка отшлифуйте P280 перед нанесением финишного покрытия"
      ],
      features: ["Отличная адгезия", "Быстрая сушка", "Изолирующие свойства", "Универсальность"]
    },
    {
      id: 4,
      name: "Воск HARD WAX твердый",
      price: 2350,
      category: "Воски",
      image: "/img/259f05f5-e4dd-4caf-a57b-b098b5b43ca4.jpg",
      description: "Твердый воск для финишной обработки мебели и изделий из дерева. Создает натуральный матовый блеск.",
      instructions: [
        "Поверхность должна быть чистой и сухой",
        "Нанесите воск тонким слоем при помощи ткани круговыми движениями",
        "Дайте впитаться 15-20 минут",
        "Отполируйте мягкой тканью до желаемого блеска",
        "При необходимости повторите процедуру"
      ],
      features: ["Натуральный состав", "Водоотталкивающие свойства", "Долговечность", "Матовый блеск"]
    },
    {
      id: 5,
      name: "Масло тунговое TUNG OIL",
      price: 3250,
      category: "Масла",
      image: "/img/b090ec4c-5d96-42ad-8246-cc69c45f803d.jpg",
      description: "100% натуральное тунговое масло для глубокой пропитки древесины. Подчеркивает естественную красоту дерева.",
      instructions: [
        "Поверхность должна быть отшлифована и очищена от пыли",
        "Нанесите масло кистью или тканью вдоль волокон",
        "Через 30 минут удалите излишки сухой тканью",
        "Время полного высыхания 24 часа",
        "Нанесите 2-3 слоя с интервалом 24 часа"
      ],
      features: ["100% натуральное", "Глубокая пропитка", "Подчеркивает текстуру", "Экологичное"]
    },
    {
      id: 6,
      name: "Шеллак SHELLAC традиционный",
      price: 4100,
      category: "Лаки",
      image: "/img/259f05f5-e4dd-4caf-a57b-b098b5b43ca4.jpg",
      description: "Традиционный французский шеллак для высококачественной отделки антикварной мебели и музыкальных инструментов.",
      instructions: [
        "Растворите шеллак в этиловом спирте в пропорции 1:3",
        "Нанесите тонкими слоями кистью или тампоном",
        "Время высыхания между слоями 2-3 часа",
        "Промежуточная шлифовка P400 между слоями",
        "Нанесите 4-6 тонких слоев для получения зеркального блеска"
      ],
      features: ["Натуральный продукт", "Зеркальный блеск", "Реставрационное качество", "Традиционная технология"]
    },
    {
      id: 7,
      name: "Патина PATINA эффектная",
      price: 1950,
      category: "Декоративные",
      image: "/img/b090ec4c-5d96-42ad-8246-cc69c45f803d.jpg",
      description: "Декоративная патина для создания эффекта старения на мебели и предметах интерьера.",
      instructions: [
        "Нанесите базовый слой краски и дайте высохнуть",
        "Нанесите патину кистью или губкой неравномерными мазками",
        "Пока патина не высохла, протрите тканью выступающие части",
        "Дайте высохнуть 4-6 часов",
        "При желании покройте защитным лаком"
      ],
      features: ["Эффект старения", "Простое нанесение", "Различные оттенки", "Декоративный эффект"]
    },
    {
      id: 8,
      name: "Клей для дерева D3 водостойкий",
      price: 890,
      category: "Клеи",
      image: "/img/259f05f5-e4dd-4caf-a57b-b098b5b43ca4.jpg",
      description: "Профессиональный водостойкий клей класса D3 для склеивания деревянных деталей.",
      instructions: [
        "Поверхности должны быть чистыми и плотно прилегающими",
        "Нанесите клей равномерным слоем на обе поверхности",
        "Время открытой выдержки 5-10 минут",
        "Плотно прижмите детали и зафиксируйте струбцинами",
        "Время схватывания 30 минут, полное отверждение 24 часа"
      ],
      features: ["Водостойкость D3", "Высокая прочность", "Быстрое схватывание", "Прозрачный шов"]
    }
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Palette" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    BORMA
                  </h1>
                  <p className="text-xs text-muted-foreground">Материалы для дерева</p>
                </div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О компании</a>
              <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
            </nav>

            <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <Icon name="ShoppingCart" size={16} />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Корзина</DialogTitle>
                  <DialogDescription>
                    {cart.length === 0 ? "Корзина пуста" : `Товаров в корзине: ${getTotalItems()}`}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.price}₽ × {item.quantity}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  ))}
                  {cart.length > 0 && (
                    <>
                      <Separator />
                      <div className="flex justify-between items-center font-semibold">
                        <span>Итого:</span>
                        <span>{getTotalPrice()}₽</span>
                      </div>
                      <Button className="w-full">
                        <Icon name="CreditCard" size={16} />
                        <span className="ml-2">Оформить заказ</span>
                      </Button>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Профессиональные материалы для дерева
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Высококачественные лако-красочные материалы BORMA для профессиональной обработки древесины
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="px-4 py-2">
              <Icon name="Award" size={16} />
              <span className="ml-2">Премиум качество</span>
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Icon name="Truck" size={16} />
              <span className="ml-2">Быстрая доставка</span>
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Icon name="Users" size={16} />
              <span className="ml-2">Экспертная поддержка</span>
            </Badge>
          </div>
          <Button size="lg" className="text-lg px-8 py-6">
            <Icon name="ArrowDown" size={20} />
            <span className="ml-2">Посмотреть каталог</span>
          </Button>
        </div>
      </section>

      {/* Products Catalog */}
      <section id="catalog" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Каталог продукции</h3>
            <p className="text-xl text-muted-foreground">
              Выберите подходящие материалы для вашего проекта
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4" variant="secondary">
                    {product.category}
                  </Badge>
                  {product.oldPrice && (
                    <Badge className="absolute top-4 right-4 bg-red-500">
                      -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">{product.price}₽</span>
                    {product.oldPrice && (
                      <span className="text-lg text-muted-foreground line-through">{product.oldPrice}₽</span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="instructions">
                      <AccordionTrigger className="text-sm">
                        <div className="flex items-center">
                          <Icon name="BookOpen" size={16} />
                          <span className="ml-2">Инструкция по применению</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                          {product.instructions.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Button 
                    className="w-full" 
                    onClick={() => addToCart(product)}
                  >
                    <Icon name="ShoppingCart" size={16} />
                    <span className="ml-2">Добавить в корзину</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-r from-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-8">О компании BORMA</h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Уже более 30 лет компания BORMA является ведущим производителем профессиональных 
              лако-красочных материалов для обработки древесины. Наши продукты используют 
              мастера-краснодеревщики, реставраторы и профессиональные столяры по всему миру.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Trophy" size={32} />
                </div>
                <h4 className="text-xl font-semibold mb-2">30+ лет опыта</h4>
                <p className="text-muted-foreground">Проверенное временем качество</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Globe" size={32} />
                </div>
                <h4 className="text-xl font-semibold mb-2">50+ стран</h4>
                <p className="text-muted-foreground">Международное признание</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Beaker" size={32} />
                </div>
                <h4 className="text-xl font-semibold mb-2">200+ продуктов</h4>
                <p className="text-muted-foreground">Полная линейка материалов</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-center mb-12">Контакты</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-2xl font-semibold mb-6">Свяжитесь с нами</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Icon name="Phone" size={20} />
                    <span>+7 (495) 123-45-67</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Icon name="Mail" size={20} />
                    <span>info@borma-russia.ru</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Icon name="MapPin" size={20} />
                    <span>Москва, ул. Промышленная, д. 15</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Icon name="Clock" size={20} />
                    <span>Пн-Пт: 9:00-18:00, Сб: 10:00-16:00</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-semibold mb-6">Наши преимущества</h4>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <Icon name="CheckCircle" size={20} />
                    <span>Бесплатная консультация специалистов</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Icon name="CheckCircle" size={20} />
                    <span>Доставка по всей России</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Icon name="CheckCircle" size={20} />
                    <span>Гарантия качества продукции</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Icon name="CheckCircle" size={20} />
                    <span>Техническая поддержка проектов</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Palette" size={20} />
                </div>
                <span className="text-xl font-bold">BORMA</span>
              </div>
              <p className="text-gray-400 text-sm">
                Профессиональные лако-красочные материалы для обработки древесины
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Продукция</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Морилки</li>
                <li>Лаки</li>
                <li>Грунтовки</li>
                <li>Воски</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Компания</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>О нас</li>
                <li>Новости</li>
                <li>Карьера</li>
                <li>Партнеры</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Поддержка</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Контакты</li>
                <li>Доставка</li>
                <li>Возврат</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="text-center text-sm text-gray-400">
            <p>&copy; 2024 BORMA. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;