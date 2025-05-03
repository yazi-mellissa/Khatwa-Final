import pic from '../Assets/Home/Arezki.png'
import phone from '../Assets/Home/phone.png'
import mail from '../Assets/Home/mail.png'
import location from '../Assets/Home/location.png'
import contact from '../Assets/Signup/chat.png'
import question from '../Assets/Signup/question.png'
import home from './../Assets/Sidebar/home.svg'
import user from './../Assets/Sidebar/user.svg'
import notif from './../Assets/Sidebar/notif.svg'
import chat from './../Assets/Sidebar/chat.svg'
import agenda from './../Assets/Sidebar/agenda.svg'
import inscriptions from './../Assets/Sidebar/inscriptions.png'
import Edit from "./../Assets/Parent Space/Edit.png"
import Question from './../Assets/Parent Space/Question.png'






export const navLinks=[
    {
        id:'',
        title:'Accueil'
    },
    {
        id:'contact',
        title:'Contactez-nous'
    },
    {
        id:'about',
        title:'A propos'
    },
    {
        id:'faq',
        title:'FAQ'
    },
 
]
export const navLinks2=[

    {
        id:'faq',
        logo:question,
        title:'FAQ'
    },
    {
        id:'contact',
        logo: contact,
        title:'Contactez-nous'
    },
    
]

export const heroPage=[
    {
        id:'ligne-1',
        title:'Inscrire Votre Enfant En Crèche'
    },
    {
        id:'ligne-2',
        title:'Devient Un Jeu D’enfants !'
    }
]

export const dykCard=[
    {
        title:'Aller à l’école à vélo améliore l’attention en classe !',
        description:'Selon une récente étude danoise, faire de l’exercice avant d’aller à l’école améliore la concentration . les enfants qui vont à l’école par vélo bénéficieraient jusqu’à 4 heures de capacité de concentration supplémentaire par rapport aux enfants qui sont conduits à l’école.'  
    },
    {
        title:'votre foetus distingue le goût des aliments que vous mangez ! ',
        description:'A quatre mois de grossesse, le développement du goût de votre bébé est très avancé, il est capable de différencier les quatre grandes saveurs : le sucré, le salé, l’acide et l’amer. Sa préférence va au sucré : plus le liquide amniotique est sucré, plus il en avale.'  
    },
    {
        title:'envoyer son enfant en crèche l’aide à  Développer ses expériences sensorielles !',
        description:'De 0 à 3 ans il est important pour les enfants de développer des expériences sensorielles, toucher, associer le bruit à la vue d’un objet, toucher pour sentir la matière .. Dans une crèche, tout est mis en place pour que les plus petits puissent vivre de telles expériences.'  
    }
    
]
export const testmon=[
    {
        img:pic,
        rating:'4.8',
        description:'“Avec khatwa je trouve toujours mon bonheur! je me suis inscrite il y a 3 ans en tant que maman . Grâce à khatwa j’arrive toujours à trouver le meilleur pour mes enfants et c’est très facile à utiliser. je recommande vivement!”',
        person:'nassima arezki - Maman de lyna et ilyes'
    },{
        img:pic,
        rating:'4.5',
        description:'“Avec khatwa je trouve toujours mon bonheur! je me suis inscrite il y a 3 ans en tant que maman . Grâce à khatwa j’arrive toujours à trouver le meilleur pour mes enfants et c’est très facile à utiliser. je recommande vivement!”',
        person:'nassima arezki - Maman de lyna et ilyes'
    },{
        img:pic,
        rating:'4.1',
        description:'“Avec khatwa je trouve toujours mon bonheur! je me suis inscrite il y a 3 ans en tant que maman . Grâce à khatwa j’arrive toujours à trouver le meilleur pour mes enfants et c’est très facile à utiliser. je recommande vivement!”',
        person:'nassima arezki - Maman de lyna et ilyes'
    },
    
]

export const Informations=[
    {
        title:'Acceuil',
        link:'/'
    },
    {
        title:'A propos',
        link:'/about'
    },
    {
        title:'FAQ',
        link:'/about'
    },
    {
        title:'centre d’aide et de support',
        link:'/help'
    }
]

export const Services=[
    {
        title:'s’inscrire en tant que parent',
        link:'/signup/parent'
    },
    {
        title:'s’inscrire en tant que gestionnaire',
        link:'/signup/creche'
    },
    {
        title:'Se connecter',
        link:'/signin'
    },
]
export const Contact=[
    {
        title:'025179865  /  023991428 ',
        img:phone
    },
    {
        title:'khatwa.equipe24@esi.dz',
        img:mail
    },
    {
        title:'BPM68 16270, Oued Smar, Alger',
        img:location
    }
]

export const SidebarCrecheContent=[
    {
        id:'',
        icon:home,
        title:'accueil'
    },
    {
        id:'profile',
        icon:user,
        title:'mon profil'
    },
    {
        id:'messages',
        icon:chat,
        title:'Messages'
    },
    {
        id:'notifications',
        icon:notif,
        title:'notifications'
    },
    {
        id:'agenda',
        icon:agenda,
        title:'calendrier'
    },
    {
        id:'inscriptions',
        icon:inscriptions,
        title:'inscriptions'
    },
    
]
export const SidebarParentContent=[
    {
        id:'',
        icon:home,
        title:'accueil'
    },
    {
        id:'profile',
        icon:user,
        title:'mon profil'
    },
  
    {
        id:'messages',
        icon:chat,
        title:'Messages'
    },
    {
        id:'notifications',
        icon:notif,
        title:'notifications'
    },
    
]
export const SidebarSettingsContent=[
    {
        id:'edit',
        icon:Edit,
        title:'Mon Profil'
    },
    {
        id:'notifications',
        icon:notif,
        title:'Notifications'
    },
    {
        id:'profile',
        icon:user,
        title:'Mon Compte'
    },
    {
        id:'question',
        icon:Question,
        title:'Aide'
    },
 
    
]

export const SidebarAdminContent=[
    {
        id:'',
        icon:home,
        title:'Dashboard'
    },
    {
        id:'parents',
        icon:user,
        title:'Parents'
    },
    {
        id:'creches',
        icon:user,
        title:'Creches'
    },
    {
        id:'admins',
        icon:inscriptions,
        title:'Admins'
    },
 
    
]