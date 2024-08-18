# Curso React.js Codigo con Juan - Quiosco App

[Curso React y TypeScript - La Guía Completa Creando +10 Proyectos](https://www.udemy.com/course/react-de-principiante-a-experto-creando-mas-de-10-aplicaciones)

## Tech Stack

- TypeScript
- React.js 18
- Next.js 14
- Tailwind CSS
- Sonner
- Zustand
- React Hook Form
- Zod
- Prisma ORM
- PostgreSQL
- Docker Compose

### Creando el Proyecto

Lo primero es crear nuestro proyecto de Next.js con TypeScript desde la terminal en la carpeta donde queremos que se aloje el proyecto.

```bash
npx create-next-app@latest
```

Podemos iniciar el proyecto con el siguiente comando:

```bash
cd quiosco-app
npm run dev
```

Abrir desde consola el proyecto con Visual Studio Code:

```bash
code .
```

Limpiamos los archivos que no vamos a utilizar:

- tailwind.config.ts
- global.css
- layout.tsx
- page.tsx

_Cada ruta en Next.js estara definida por una carpeta con el nombre de la ruta y su respectivo archivo page.tsx_

### Carpets en Next.js y archivos reservados

- Con el App Router, Next.js agrego una gran cantidad de archivos reservados que cumplen ciertas funciones y dan orden a tus aplicaciones.
- Tambien las carpetas forman parte importante de tus proyectos, ya que cada carpeta sera una ruta del sitio web o un endpoint de la API.
- La estructura de carpetas para las rutas dentro de Next.js se define como segementos donde cada parte de la URL o carpeta es un segmento de la ruta, es decir en `/products/new`, `products` y `new` son segmentos de la ruta.

#### Convenciones de Archivos (js, jsx, tsx)

- layout: Diseño global que comparte una URL o sus segmentos hijos. Es decir, por ejemplo en `/products/new` vimos que `products` es un segmento y `new` es otro segmento, si creas un layout.tsx en `/products` este se aplica tambien al segmento `new`. Los layouts te ayudan a no repetir codigo y tener un diseño organizado.
- page: Diseño unico para una URL. Archivo que define una URL o un segmento de la URL. En Next.js cada archivo page.tsx es una ruta de tu aplicacion.
- loading: Es un componente que se muestra mientras carga una pagina con el componente `<Suspense>` de React.
- not-found: Componente que se muestra cuando un recurso no es encontrado o una URL no existe en tu aplicacion [404].
- error: Componente que se muestra cuando hay un error inesperado en tu aplicacion, como un error en la conexion a la base de datos o un error en la respuesta de nuestra API.
- route: Este es un componente para crear un endpoint de una REST API.

### Rendering en Next.js

Tenemos definadas dos categorias de renderizado en Next.js: Compoenentes del Cliente y Componentes del Servidor.

#### Server Components

- Una de las principales caracteristicas que tiene Next.js desde que fue lanzado, es poder ejecutar codigo de React en el servidor.
- En versiones anteriores de Next.js, el mismo codigo se ejecutaba primero en el servidor y despues en el cliente. Esto permitia que en un mismo proyecto de Next.js pudieras obtener los datos de una REST API y despues mostrar los resultados ya en pantalla.
- Desde Next.js 13 con el `app directory`, todos los componentes se ejecutan por `default` en el servidor.
- En caso de que sea necesario se puede añadir que un componente sea renderizado y ejecutado en el cliente, mediante la directiva `use client`.
- Cuando tienes aplicaciones con componentes de Servidor y Client es muy importante mencionar que el codigo es `unidireccional`, es decir primero se ejecutan los componentes de servidor y despues los de cliente.
- Si definimos un componente como componente de cliente con la directiva `use client`, entonces todos sus componentes hijos tambien seran `client side`.
- Un `componente de servidor` puede renderizar componente de cliente, todos los que sean necesarios, ya que siempre se ejecuta primero el servidor y luego el cliente.
- Si dentro de un `componente de servidor` renderizamos un `componente de cliente` el cual tiene como hijo otro `componente de servidor`, esto no es posible por defecto, pero si por medio de la `composicion de componentes`.
- Si tenemos un `componente de servidor` que renderiza un `componente de cliente` y este a su vez renderiza otro `componente de cliente`, esto si es posible sin tener que definir nuevamente en el componente hijo la directiva `use client`.

page.tsx

```tsx
import Sidebar from "@/components/sidebar";

export default function Home() {
  console.log("Desde el Servidor");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Sidebar />
    </main>
  );
}
```

siderbar.tsx

```tsx
"use client";
type Props = {};

const Sidebar = (props: Props) => {
  console.log("Desde el Cliente");
  return <div>Sidebar</div>;
};
export default Sidebar;
```

#### Cuando utilizar Server Components y cuando Client Components

- Utilizar `Server Components` para obtener datos desde un ORM y mostrar la informacion
- Utilizar `Server Components` para ejecutar funciones del servidor y acceder a recursos unicamente que estan en el backend
- Utilizar `Server Components` para autenticacion, API Keys o Tokens
- Utilizar `Client Components` para eventos (Event Handlers de React) o añadir interaccion a tus aplicaciones por medio de eventos onClick, onSubmit, onChange, etc.
- Utilizar `Client Components` para poder utilizar los Hooks de React como useState, useEffect, useReducer, useContext, etc.
- Utilizar `Client Components` para poder utilizar librerias que no se ejecuten en el Servidor como Sonner, Zustand u otras que se ejecuten en el cliente.
- Utilizar `Client Components` para poder utilizar las APIs del navegador como LocalStorage, SessionStorage, IndexedDB, Notification API, GeoLocation API, etc.
- Utilizar `Client Components` para consumir datos de una API externa en JSON

### Creando los contenedores principales

Vamos a utilizar el archivo `layout.tsx` para que todos las paginas que se encuentren dentro de la carpeta `orders` compartan el mismo diseño.

orders/layout.tsx

```tsx
import OrderSidebar from "@/components/order/order-sidebar";
import OrderSummary from "@/components/order/order-summary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders | Quiosco App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="md:flex">
        <OrderSidebar />

        <main className="md: flex-1 md:h-screen md:overflow-y-scroll p-5">
          {children}{" "}
          {/* Aqui se renderizan las paginas hijas dentro de orders/page.tsx */}
        </main>

        <OrderSummary />
      </div>
    </>
  );
}
```
