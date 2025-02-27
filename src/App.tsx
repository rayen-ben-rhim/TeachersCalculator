import React, { useState, useEffect } from "react";
import {
  Download,
  Calculator,
  Clock,
  Award,
  CheckCircle,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { useScrollAnimation } from "./hooks/useScrollAnimation";

// Language translations
const translations = {
  en: {
    nav: {
      features: "Features",
      download: "Download",
      faq: "FAQ",
    },
    hero: {
      title: "The Ultimate Calculator for Teachers",
      subtitle:
        "Simplify your grading process with our specialized calculator designed specifically for educators.",
      downloadBtn: "Download Now - Free",
    },
    preview: {
      title: "Your Grading Assistant",
    },
    features: {
      title: "Features",
      feature1: {
        title: "Quick Grade Calculations",
        desc: "Specialized buttons for common grade increments (0.25, 0.5, 0.75, etc.) make grading faster and more accurate.",
      },
      feature2: {
        title: "Time-Saving Interface",
        desc: "Designed specifically for educators with an intuitive interface that speeds up the grading process.",
      },
      feature3: {
        title: "Education-Focused",
        desc: "Created by teachers for teachers, with features that address real classroom needs.",
      },
    },
    download: {
      title: "Download Teachers' Calculator",
      subtitle:
        "Get our free Windows application and simplify your grading process today.",
      downloadBtn: "Download for Windows",
      free: "Free Forever",
      noReg: "No Registration Required",
      compatible: "Windows 10/11 Compatible",
    },
    faq: {
      title: "Frequently Asked Questions",
      q1: {
        question: "Is Teachers' Calculator really free?",
        answer:
          "Yes, Teachers' Calculator is completely free to download and use. There are no hidden fees or in-app purchases.",
      },
      q2: {
        question: "What operating systems are supported?",
        answer:
          "Currently, Teachers' Calculator is available for Windows 10 and Windows 11.",
      },
      q3: {
        question: "Do I need to create an account?",
        answer:
          "No, Teachers' Calculator doesn't require any account creation or registration. Simply download and start using it.",
      },
      q4: {
        question: "Is my data collected?",
        answer:
          "No, Teachers' Calculator doesn't collect any personal data or usage statistics. Your privacy is important to us.",
      },
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  fr: {
    nav: {
      features: "Fonctionnalités",
      download: "Télécharger",
      faq: "FAQ",
    },
    hero: {
      title: "La Calculatrice Ultime pour Enseignants",
      subtitle:
        "Simplifiez votre processus de notation avec notre calculatrice spécialisée conçue spécifiquement pour les éducateurs.",
      downloadBtn: "Télécharger Maintenant - Gratuit",
    },
    preview: {
      title: "Votre Assistant de Notation",
    },
    features: {
      title: "Fonctionnalités",
      feature1: {
        title: "Calculs de Notes Rapides",
        desc: "Des boutons spécialisés pour les incréments de notes courants (0,25, 0,5, 0,75, etc.) rendent la notation plus rapide et plus précise.",
      },
      feature2: {
        title: "Interface Gain de Temps",
        desc: "Conçue spécifiquement pour les éducateurs avec une interface intuitive qui accélère le processus de notation.",
      },
      feature3: {
        title: "Axée sur l'Éducation",
        desc: "Créée par des enseignants pour des enseignants, avec des fonctionnalités qui répondent aux besoins réels en classe.",
      },
    },
    download: {
      title: "Télécharger la Calculatrice des Enseignants",
      subtitle:
        "Obtenez notre application Windows gratuite et simplifiez votre processus de notation dès aujourd'hui.",
      downloadBtn: "Télécharger pour Windows",
      free: "Gratuit pour Toujours",
      noReg: "Pas d'Inscription Requise",
      compatible: "Compatible Windows 10/11",
    },
    faq: {
      title: "Questions Fréquemment Posées",
      q1: {
        question: "La Calculatrice des Enseignants est-elle vraiment gratuite?",
        answer:
          "Oui, la Calculatrice des Enseignants est complètement gratuite à télécharger et à utiliser. Il n'y a pas de frais cachés ou d'achats intégrés.",
      },
      q2: {
        question: "Quels systèmes d'exploitation sont pris en charge?",
        answer:
          "Actuellement, la Calculatrice des Enseignants est disponible pour Windows 10 et Windows 11.",
      },
      q3: {
        question: "Dois-je créer un compte?",
        answer:
          "Non, la Calculatrice des Enseignants ne nécessite aucune création de compte ou inscription. Téléchargez-la simplement et commencez à l'utiliser.",
      },
      q4: {
        question: "Mes données sont-elles collectées?",
        answer:
          "Non, la Calculatrice des Enseignants ne collecte aucune donnée personnelle ou statistique d'utilisation. Votre confidentialité est importante pour nous.",
      },
    },
    footer: {
      rights: "Tous droits réservés.",
    },
  },
  ar: {
    nav: {
      features: "المميزات",
      download: "تحميل",
      faq: "الأسئلة الشائعة",
    },
    hero: {
      title: "الآلة الحاسبة المثالية للمعلمين",
      subtitle:
        "بسّط عملية التقييم مع آلتنا الحاسبة المتخصصة المصممة خصيصًا للمعلمين.",
      downloadBtn: "تحميل الآن - مجانًا",
    },
    preview: {
      title: "مساعدك في التقييم",
    },
    features: {
      title: "المميزات",
      feature1: {
        title: "حسابات سريعة للدرجات",
        desc: "أزرار متخصصة لزيادات الدرجات الشائعة (0.25، 0.5، 0.75، إلخ) تجعل التقييم أسرع وأكثر دقة.",
      },
      feature2: {
        title: "واجهة موفرة للوقت",
        desc: "مصممة خصيصًا للمعلمين بواجهة بديهية تسرّع عملية التقييم.",
      },
      feature3: {
        title: "تركيز على التعليم",
        desc: "تم إنشاؤها بواسطة معلمين للمعلمين، مع ميزات تلبي احتياجات الفصل الدراسي الحقيقية.",
      },
    },
    download: {
      title: "تحميل آلة حاسبة المعلمين",
      subtitle: "احصل على تطبيق Windows المجاني وبسّط عملية التقييم اليوم.",
      downloadBtn: "تحميل لنظام Windows",
      free: "مجاني للأبد",
      noReg: "لا يلزم التسجيل",
      compatible: "متوافق مع Windows 10/11",
    },
    faq: {
      title: "الأسئلة المتداولة",
      q1: {
        question: "هل آلة حاسبة المعلمين مجانية حقًا؟",
        answer:
          "نعم، آلة حاسبة المعلمين مجانية تمامًا للتنزيل والاستخدام. لا توجد رسوم خفية أو مشتريات داخل التطبيق.",
      },
      q2: {
        question: "ما هي أنظمة التشغيل المدعومة؟",
        answer:
          "حاليًا، آلة حاسبة المعلمين متاحة لنظامي Windows 10 و Windows 11.",
      },
      q3: {
        question: "هل أحتاج إلى إنشاء حساب؟",
        answer:
          "لا، لا تتطلب آلة حاسبة المعلمين أي إنشاء حساب أو تسجيل. ما عليك سوى التنزيل والبدء في استخدامها.",
      },
      q4: {
        question: "هل يتم جمع بياناتي؟",
        answer:
          "لا، لا تجمع آلة حاسبة المعلمين أي بيانات شخصية أو إحصاءات استخدام. خصوصيتك مهمة بالنسبة لنا.",
      },
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
    },
  },
};

function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("preferredLanguage") || "en";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const t = translations[language as keyof typeof translations];

  const getLayoutDirection = () => {
    return language === "ar" ? "rtl" : "ltr";
  };

  const getTextAlignment = () => {
    return language === "ar" ? "text-right" : "text-left";
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem("preferredLanguage", newLanguage);
  };

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const heroAnimation = useScrollAnimation();
  const featuresAnimation = useScrollAnimation();
  const downloadAnimation = useScrollAnimation();
  const faqAnimation = useScrollAnimation();

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 ${getLayoutDirection()}`}
      dir={getLayoutDirection()}
    >
      <header className="bg-gray-900 text-white py-4 px-4 sm:px-6 sticky top-0 z-20 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            <h1 className="text-xl font-bold">Teachers' Calculator</h1>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-gray-800 text-white border-none rounded p-1 text-sm"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
              </select>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a
                    href="#features"
                    onClick={(e) => handleSmoothScroll(e, "features")}
                    className="hover:text-blue-300 transition-colors"
                  >
                    {t.nav.features}
                  </a>
                </li>
                <li>
                  <a
                    href="/TeachersCalculator.exe"
                    className="hover:text-blue-300 transition-colors"
                  >
                    {t.nav.download}
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    onClick={(e) => handleSmoothScroll(e, "faq")}
                    className="hover:text-blue-300 transition-colors"
                  >
                    {t.nav.faq}
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileMenu}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-30 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Calculator className="h-6 w-6" />
              <span className="font-bold">Teachers' Calculator</span>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-6 border-b border-gray-700 pb-4">
            <Globe className="h-5 w-5" />
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-gray-800 text-white border-none rounded p-2 text-sm w-full"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          <nav>
            <ul className="space-y-4">
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleSmoothScroll(e, "features")}
                  className="block hover:text-blue-300 transition-colors py-2 px-1 border-l-4 border-transparent hover:border-blue-300"
                >
                  {t.nav.features}
                </a>
              </li>
              <li>
                <a
                  href="/TeachersCalculator.exe"
                  className="block hover:text-blue-300 transition-colors py-2 px-1 border-l-4 border-transparent hover:border-blue-300"
                >
                  {t.nav.download}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleSmoothScroll(e, "faq")}
                  className="block hover:text-blue-300 transition-colors py-2 px-1 border-l-4 border-transparent hover:border-blue-300"
                >
                  {t.nav.faq}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <section
        ref={heroAnimation.elementRef}
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6"
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:gap-12">
          <div
            className={`md:w-1/2 space-y-4 sm:space-y-6 ${getTextAlignment()} transform transition-all duration-1000 ${
              isLoaded && heroAnimation.isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              {t.hero.subtitle}
            </p>
            <div className="pt-2 sm:pt-4">
              <a
                href="/TeachersCalculator.exe"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg inline-flex items-center transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-xl"
              >
                <Download className="mr-2 h-5 w-5" />
                {t.hero.downloadBtn}
              </a>
            </div>
          </div>
          <div
            className={`md:w-1/2 w-full mt-8 md:mt-0 max-w-[330px] md:max-w-[400px] sm:max-w-[400px] transform transition-all duration-1000 ${
              isLoaded && heroAnimation.isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            <div className="bg-gray-900 p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl text-white text-center">
              <div className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Teachers' Calculator
              </div>
              <div className="bg-gray-800 p-3 sm:p-4 rounded mb-4 sm:mb-6 text-left overflow-x-auto">
                <code className="text-green-400 text-xs sm:text-sm">
                  0.25 + 1.25 + 0.5 + 1.5 + 0.25 + 1.25 +<br />
                  0.75 + 0.75 + 0.25 + 1.25 + 2.25 + 1.5 +<br />
                  2.75 + 1.25 + 2.5 + 1 + 0.25 + _
                </code>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-mono mb-6 sm:mb-8">
                19.5
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4">
                {[
                  0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3,
                ].map((num) => (
                  <div
                    key={num}
                    className="bg-gray-700 p-2 sm:p-3 rounded text-center hover:bg-gray-600 transition-colors cursor-pointer text-sm sm:text-base"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={featuresAnimation.elementRef}
        id="features"
        className="py-12 sm:py-16 px-4 sm:px-6 bg-white overflow-hidden"
      >
        <div className="container mx-auto">
          <h2
            className={`text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-gray-800 transform transition-all duration-700 ${
              featuresAnimation.isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            {t.features.title}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Calculator className="h-8 sm:h-10 w-8 sm:w-10" />,
                title: t.features.feature1.title,
                desc: t.features.feature1.desc,
              },
              {
                icon: <Clock className="h-8 sm:h-10 w-8 sm:w-10" />,
                title: t.features.feature2.title,
                desc: t.features.feature2.desc,
              },
              {
                icon: <Award className="h-8 sm:h-10 w-8 sm:w-10" />,
                title: t.features.feature3.title,
                desc: t.features.feature3.desc,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`bg-gray-50 p-5 sm:p-6 rounded-lg shadow-md ${getTextAlignment()} transform transition-all duration-700 hover:scale-105 hover:shadow-xl`}
                style={{
                  transitionDelay: `${index * 200}ms`,
                  opacity: featuresAnimation.isVisible ? 1 : 0,
                  transform: featuresAnimation.isVisible
                    ? "translateY(0)"
                    : "translateY(50px)",
                }}
              >
                <div className="text-blue-600 mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={downloadAnimation.elementRef}
        id="download"
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-blue-600 text-white relative overflow-hidden"
      >
        <div className="container mx-auto text-center relative z-10">
          <div
            className={`transform transition-all duration-1000 ${
              downloadAnimation.isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
              {t.download.title}
            </h2>
            <p className="text-base sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
              {t.download.subtitle}
            </p>
            <a
              href="/TeachersCalculator.exe"
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-lg inline-flex items-center transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-xl"
            >
              <Download className="mr-2 h-5 sm:h-6 w-5 sm:w-6" />
              {t.download.downloadBtn}
            </a>
          </div>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            {[t.download.free, t.download.noReg, t.download.compatible].map(
              (text, index) => (
                <div
                  key={index}
                  className="flex items-center transform transition-all duration-500"
                  style={{
                    transitionDelay: `${index * 200}ms`,
                    opacity: downloadAnimation.isVisible ? 1 : 0,
                    transform: downloadAnimation.isVisible
                      ? "translateY(0)"
                      : "translateY(20px)",
                  }}
                >
                  <CheckCircle className="text-white mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                  <span className="text-sm sm:text-base">{text}</span>
                </div>
              )
            )}
          </div>
        </div>
        <div
          className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-50 transform transition-transform duration-1000 ${
            downloadAnimation.isVisible ? "-skew-y-6" : "skew-y-0"
          }`}
        ></div>
      </section>

      <section
        ref={faqAnimation.elementRef}
        id="faq"
        className="py-12 sm:py-16 px-4 sm:px-6 bg-white"
      >
        <div className="container mx-auto">
          <h2
            className={`text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-gray-800 transform transition-all duration-700 ${
              faqAnimation.isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            {t.faq.title}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            {[
              { q: t.faq.q1.question, a: t.faq.q1.answer },
              { q: t.faq.q2.question, a: t.faq.q2.answer },
              { q: t.faq.q3.question, a: t.faq.q3.answer },
              { q: t.faq.q4.question, a: t.faq.q4.answer },
            ].map((faq, index) => (
              <div
                key={index}
                className={`bg-gray-50 p-4 sm:p-6 rounded-lg ${getTextAlignment()} transform transition-all duration-500 hover:shadow-lg`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  opacity: faqAnimation.isVisible ? 1 : 0,
                  transform: faqAnimation.isVisible
                    ? "translateY(0)"
                    : "translateY(30px)",
                }}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-6 sm:py-8 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <Calculator className="h-5 w-5" />
              <span className="font-semibold">Teachers' Calculator</span>
            </div>
            <div className="text-gray-400 text-xs sm:text-sm">
              © {new Date().getFullYear()} Teachers' Calculator.{" "}
              {t.footer.rights}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
