import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <div className="flex items-center border border-border rounded-sm overflow-hidden">
        <Button
          variant="ghost"
          size="sm"
          className={`px-2 py-1 h-7 rounded-none text-xs font-medium transition-colors ${
            language === 'en'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
          onClick={() => setLanguage('en')}
        >
          EN
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`px-2 py-1 h-7 rounded-none text-xs font-medium transition-colors ${
            language === 'fr'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
          onClick={() => setLanguage('fr')}
        >
          FR
        </Button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
