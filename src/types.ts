export interface Webinar {
  id: string;
  fields: {
    id_seminaire_event: string;
    nom_event: string;
    date_event: string;
    max_user: number;
    descript_event: string;
    conversion_lien_img: string;
    etat: string;
  };
}

export interface Conseiller {
  id: string;
  fields: {
    nom_conseil: string;
    prenom_conseil: string;
    mail_conseil: string;
  };
}

export interface RegistrationFormData {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  conseiller: string;
  id_seminaire_event: string;
}
