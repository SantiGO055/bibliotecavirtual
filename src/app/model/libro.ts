export interface Libro {
    id?: string;
    titulo: string;
    autor: string;
    editorial: string;
    urlImagen?: string;
    urlArchivo: string;
    nombreArchivo: string;
    categoria: string;
}

export interface Libros{
    categoria: string;
    libro: Libro;
}