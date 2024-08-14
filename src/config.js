export const productsTableHeader =  [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Denumire',
    },
    {
        id: 'weightToDisplay',
        numeric: false,
        disablePadding: false,
        label: 'Gramaj',
    },
    {
        id: 'category',
        numeric: true,
        disablePadding: false,
        label: 'Categoria',
    },
    {
        id: 'barcode',
        numeric: true,
        disablePadding: false,
        label: 'Barcode',
    },
    {
        id: 'sealed_quantity',
        numeric: true,
        disablePadding: false,
        label: 'Cantitate sigilata',
    },
    {
        id: 'unsealed_quantity',
        numeric: true,
        disablePadding: false,
        label: 'Cantitate desfacuta',
    },
    {
        id: 'warning_quantity',
        numeric: true,
        disablePadding: false,
        label: 'Cantitate minima',
    },
]


export const logsTableHeader =  [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Nume produs',
    },
    {
        id: 'weightToDisplay',
        numeric: false,
        disablePadding: false,
        label: 'Gramaj',
    },
    {
        id: 'diff_sealed_quantity',
        numeric: true,
        disablePadding: false,
        label: 'Modificari produse sigilate',
    },
    {
        id: 'diff_unsealed_quantity',
        numeric: true,
        disablePadding: false,
        label: 'Modificari produse desfacute',
    },
    {
        id: 'new_sealed_quantity',
        numeric: true,
        disablePadding: false,
        label: 'Noua cantitate sigilata',
    },
    {
        id: 'new_unsealed_quantity',
        numeric: true,
        disablePadding: false,
        label: 'Noua cantitate desfacuta',
    },
    {
        id: 'old_sealed_quantity',
        numeric: true,
        disablePadding: false,
        label: 'Vechea cantitate sigilata',
    },
    {
        id: 'old_unsealed_quantity',
        numeric: true,
        disablePadding: false,
        label: 'Vechea cantitate desfacuta',
    },
]

export const reviewModificationHeader =   [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Nume produs',
    },
    {
        id: 'weightToDisplay',
        numeric: false,
        disablePadding: false,
        label: 'Gramaj',
    },
    {
        id: 'sealedDiff',
        numeric: true,
        disablePadding: false,
        label: 'Modificari produse sigilate',
    },
    {
        id: 'unsealedDiff',
        numeric: true,
        disablePadding: false,
        label: 'Modificari produse desfacute',
    }
]