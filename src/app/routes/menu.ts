
const Institucion = {
    text: 'Catalogos',
    link: '/catalog',
    icon: 'icon-speedometer',
    role: [] = [1,2],
    submenu: [
        {
            text: 'Instituciones',
            role: [] = [1,2],
            link: '/catalog/institution'
        },
        {
            text: 'Region',
            role: [] = [1,2],
            link: '/catalog/region'
        },
        {
            text: 'Sector',
            role: [] = [1,2],
            link: '/catalog/sector'
        },
        {
            text: 'Ambito',
            role: [] = [1,2],
            link: '/catalog/ambito'
        },
        {
            text: 'Provincia',
            role: [] = [1,2],
            link: '/catalog/provinc'
        },
        {
            text: 'Departamento',
            role: [] = [1,2],
            link: '/catalog/departament'
        },
        {
            text: 'Localidad',
            role: [] = [1,2],
            link: '/catalog/locality'
        }
    ]
};

const Persons = {

    text: 'Empleados',
    link: '/person',
    icon: 'icon-speedometer',
    role: [] = [1,2],
    submenu: [
        {
            text: 'Empleados',
            role: [] = [1,2],
            link: '/person/persons'
        }
    ]
};

const Users = {
    text: 'Configuracion',
    link: '/config',
    icon: 'icon-grid',
    role: [] = [1,2],
    submenu: [
        {
            text: 'Usuarios',
            link: '/config/users',
            role: [] = [1,2],
        },
        {
            text: 'Roles',
            role: [] = [1,2],
            link: '/config/roles'
        }
    ]
};

const Eleccion = {
    text: 'Eleccion',
    link: '/eleccion',
    icon: 'icon-grid',
    role: [] = [1,2],
    submenu: [
        {
            text: 'Criterios',
            link: '/eleccion/criterios',
            role: [] = [1,2]
        },
        {
            text: 'Candidatas',
            link: '/eleccion/candidatas',
            role: [] = [1,2]
        },
        {
            text: 'Lista',
            link: '/eleccion/lista',
            role: [] = [1]
        },
        {
            text: 'Calificaciones',
            link: '/eleccion/calificaciones',
            role: [] = [1,2]
        }
    ]
};

export const menu = [
    Users, 
    Persons, 
    Institucion
   
];
