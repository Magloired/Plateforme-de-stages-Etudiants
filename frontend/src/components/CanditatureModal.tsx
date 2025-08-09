import { CandidatureForm, Stage } from './types';
import { X, User, Mail, Phone, File } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface Props {
  stage: Stage;
  form: CandidatureForm;
  onChange: (field: keyof CandidatureForm, value: string | File | null) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function CandidatureModal({ stage, form, onChange, onClose, onSubmit }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl bg-background w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b border-border flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-2xl font-bold">Candidature</CardTitle>
            <p className="text-muted-foreground">{stage.titre} - {stage.entreprise.nom}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="h-8 w-8 rounded-full hover:bg-accent"
            title="Fermer"
          >
            <X size={20} />
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <User size={16} />
                  Nom *
                </Label>
                <Input
                  type="text"
                  required
                  value={form.nom}
                  onChange={(e) => onChange('nom', e.target.value)}
                  placeholder="Votre nom"
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <User size={16} />
                  Prénom *
                </Label>
                <Input
                  type="text"
                  required
                  value={form.prenom}
                  onChange={(e) => onChange('prenom', e.target.value)}
                  placeholder="Votre prénom"
                  className="h-12 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Mail size={16} />
                Email *
              </Label>
              <Input
                type="email"
                required
                value={form.email}
                onChange={(e) => onChange('email', e.target.value)}
                placeholder="Votre adresse email"
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Phone size={16} />
                Téléphone *
              </Label>
              <Input
                type="tel"
                required
                value={form.telephone}
                onChange={(e) => onChange('telephone', e.target.value)}
                placeholder="Votre numéro de téléphone"
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cv" className="text-sm font-medium flex items-center gap-2">
                <File size={16} />
                CV (PDF) *
              </Label>
              <Input
                id="cv"
                type="file"
                accept=".pdf"
                required
                title="Sélectionnez votre CV au format PDF"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    onChange('cv', e.target.files[0]);
                  }
                }}
                className="h-12 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lettreMotivation" className="text-sm font-medium flex items-center gap-2">
                <File size={16} />
                Lettre de motivation (PDF) *
              </Label>
              <Input
                id="lettreMotivation"
                type="file"
                accept=".pdf"
                required
                title="Ajoutez votre lettre de motivation"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    onChange('motivation', e.target.files[0]);
                  }
                }}
                className="h-12 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                className="px-8 py-3 h-12 rounded-xl font-semibold"
              >
                Envoyer la candidature
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
