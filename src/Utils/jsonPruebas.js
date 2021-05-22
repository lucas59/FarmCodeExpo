export const arre = [
  /*{
    tipo: "medicamento",
    CPP: "A001",
    GTIN: "787987897878979",
    Foto:
      "https://tiendacdn.farmashop.com.uy/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/5/1/51586_10.jpg",
    Descripcion: "Novemina x 50 ml",
    FormaFarmaceutica: "jarabe",
    ContenidoNeto: [50, "ml"],
    GTINPromo: [null],
    ViaAdministracion: "oral",
    PrincipioActivo: [
      {
        Nombre: "Loratadina",
        Concentracion: [50, "mg"],
        CantidadSolvente: [5, "ml"],
      },
      {
        Nombre: "Dexametasona",
        Concentracion: [1, "ml"],
        CantidadSolvente: [1, "ml"],
      },
    ],
    ContieneAzucar: true,
    ContieneLactosa: false,
  },*/

  //**************************************************** */
  {
    tipo: 'farmaceutico',
    atributosBasicos: {
      gtin: '7730698002125',
      descripcion: 'AMOXIDAL 500 COMPPRIMIDOS',
      marca: 'AMOXIDAL 500 mg x 16 comp',
      contenidoNeto: {
        valor: 16,
        unidad: 'unidades',
      },
      foto: 'https://www.roemmers.com.uy/wp-content/uploads/2018/09/Amoxidal500x16.jpg',
    },
    formaFarmaceutica: 'comprimidos',
    viaAdministracion: 'oral',

    principioActivo: [
      {
        nombre: 'AMOXICILINA',
        concentracion: {
          valor: 500,
          unidad: 'mg',
        },
        enMedio: {
          valor: 1,
          unidad: 'comprimido',
        },
      },
    ],

    alertasyAvisos: [],

    kitPromocional: [
      {
        producto: null,
      },
    ],

    enlacesExternos: {
      prospecto: null,
      website: null,
    },
  },
  {
    tipo: 'farmaceutico',
    atributosBasicos: {
      gtin: '7730215000986',
      descripcion: 'SERFLU 250 AEROSOL',
      marca: 'SERFLU',
      contenidoNeto: {
        valor: 120,
        unidad: 'Inhalaciones',
      },
      foto: 'https://www.haymann.com.uy/img/productos/neumologia/serflu.png',
    },
    formaFarmaceutica: 'Aerosol',
    viaAdministracion: 'Inhalatoria oral',
    principioActivo: [
      {
        nombre: 'Fluticasona propionato',
        concentracion: {
          valor: 0.25,
          unidad: 'mg',
        },
        enMedio: {
          valor: 1,
          unidad: 'Inhalación',
        },
      },
      {
        nombre: 'Salmeterol xinafoato',
        concentracion: {
          valor: 0.0363,
          unidad: 'mg',
        },
        enMedio: {
          valor: 1,
          unidad: 'Inhalación',
        },
      },
    ],
    alertasyAvisos: [],

    kitPromocional: [
      {
        producto: null,
      },
    ],

    enlacesExternos: {
      prospecto: null,
      website: null,
    },
  },

  {
    tipo: 'farmaceutico',
    atributosBasicos: {
      gtin: '7730215000740',
      descripcion: 'MONTELAIR 10 MG',
      marca: 'MONTELAIR',
      contenidoNeto: {
        valor: 10,
        unidad: 'unidades',
      },
      foto: 'https://www.haymann.com.uy/img/productos/antialergicos/histapin.png',
    },
    formaFarmaceutica: 'Comprimidos recubiertos',
    viaAdministracion: 'oral',
    principioActivo: [
      {
        nombre: 'Montelukast',
        concentracion: {
          valor: 10,
          unidad: 'mg',
        },
        enMedio: {
          valor: 1,
          unidad: 'comprimido',
        },
      },
    ],
    alertasyAvisos: [
      {
        id: 'lac',
        alerta: 'Contiene Lactosa',
      },
    ],
    kitPromocional: [
      {
        producto: null,
      },
    ],
    enlacesExternos: {
      prospecto: null,
      website: null,
    },
  },

  //****************************** */

  /* {
    tipo: "medicamento",
    CPP: "A001",
    GTIN: "787987897878979",
    Foto:
      "https://www.spefar.com/wp-content/uploads/2019/11/7730900573085-Perifar-2%EF%BF%BD-suspensi%C3%B3n-100-ML.jpg",
    Descripcion: "Perifar Pediatrico x 150 ml",
    FormaFarmaceutica: "jarabe",
    ContenidoNeto: [50, "ml"],
    GTINPromo: [null],
    ViaAdministracion: "oral",
    PrincipioActivo: [
      {
        Nombre: "Loratadina",
        Concentracion: [50, "mg"],
        CantidadSolvente: [5, "ml"],
      },
      {
        Nombre: "Dexametasona",
        Concentracion: [1, "ml"],
        CantidadSolvente: [1, "ml"],
      },
    ],
    ContieneAzucar: true,
    ContieneLactosa: false,
  },

  {
    tipo: "medicamento",
    CPP: "A001",
    GTIN: "787987897878979",
    Foto: "https://pomazeta.files.wordpress.com/2009/02/capsa1.jpg?w=584",
    Descripcion: "Aspirina Pediatrico x 100 ml",
    FormaFarmaceutica: "jarabe",
    ContenidoNeto: [50, "ml"],
    GTINPromo: [null],
    ViaAdministracion: "oral",
    PrincipioActivo: [
      {
        Nombre: "Loratadina",
        Concentracion: [50, "mg"],
        CantidadSolvente: [5, "ml"],
      },
      {
        Nombre: "Dexametasona",
        Concentracion: [1, "ml"],
        CantidadSolvente: [1, "ml"],
      },
    ],
    ContieneAzucar: true,
    ContieneLactosa: false,
  },*/
];
