import { CandidatureForm, Stage } from './types';
import { X, User, Mail, Phone, File } from 'lucide-react';

interface Props {
  stage: Stage;
  form: CandidatureForm;
  onChange: (field: keyof CandidatureForm, value: string | File | null) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function CandidatureModal({ stage, form, onChange, onClose, onSubmit }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Candidature</h2>
            <p className="text-gray-600">{stage.titre} - {stage.entreprise}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full" title="Fermer">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                <User size={16} className="inline mr-2" />Nom *
              </label>
              <input
                type="text"
                required
                value={form.nom}
                onChange={(e) => onChange('nom', e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                <User size={16} className="inline mr-2" />Prénom *
              </label>
              <input
                type="text"
                required
                value={form.prenom}
                onChange={(e) => onChange('prenom', e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
                placeholder="Votre prénom"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              <Mail size={16} className="inline mr-2" />Email *
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="Votre adresse email"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              <Phone size={16} className="inline mr-2" />Téléphone *
            </label>
            <input
              type="tel"
              required
              value={form.telephone}
              onChange={(e) => onChange('telephone', e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="Votre numéro de téléphone"
            />
          </div>

          <div>
                <label htmlFor="cv" className="text-sm font-medium text-gray-700 mb-1 block">
                  <File size={16} className="inline mr-2" />
                  CV (PDF) *
                </label>
                <input
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
                  className="w-full border rounded-xl px-4 py-2"
                />
              </div>


              <div>
                <label htmlFor="lettreMotivation" className="text-sm font-medium text-gray-700 mb-1 block">
                  <File size={16} className="inline mr-2" />
                  Lettre de motivation (PDF) *
                </label>
                <input
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
                  className="w-full border rounded-xl px-4 py-2"
                />
              </div>

          <div className="text-right pt-4">
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
              Envoyer la candidature
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
