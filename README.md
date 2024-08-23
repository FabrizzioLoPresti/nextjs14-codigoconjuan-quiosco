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

### Que es Prisma ORM

- Prisma es un ORM (Object Relational Mapping) que nos permite interactuar con nuestra base de datos de una manera mas sencilla y eficiente, es opensource y se puede utilizar tanto con JavaScript como con TypeScript.
- Consta de tres partes principales:
  - Prisma Client: sirve para interactuar con la base de datos y ejecutar queries desde nuestra aplicacion. Es el `Query Builder` o la herramienta que te permite consultar tu base de datos, soporta Node.js y TypeScript. Ademas se puede utilizar con Next.js son ningun problema.
  - Prisma Studio: es un cliente web para ver los datos de la base de datos y hacer consultas. Es la unica herramienta de Prisma que no es OpenSource pero se puede utilizar localmente, es para ver tu base de datos.
  - Prisma Migrate: es el sistema de migraciones. En Prisma ORM puedes definir tus tablas y relaciones, y esta herramienta se encargara de generar toda la base de datos.

#### Bases de datos soportadas por Prisma

- MariaDB
- MySQL
- PostgreSQL
- SQLite
- SQL Server 2017, 2019 y 2022
- MongoDB (mejor Mongoose)

### Instalando Prisma ORM

Primero debemos instalar por medio de la Consola de Comandos de Windows o la Terminal de Visual Studio Code las siguientes dependencias dentro de nuestro proyecto:

```bash
  npm install @prisma/client
  npm install -D prisma
```

Ahora debemos configurar Prisma en nuestro proyecto, para ello debemos ejecutar el siguiente comando, el cual creara el `schema.prisma` en la raiz de nuestro proyecto y donde podremos definir las diferentes tablas y como se van a relacionar entre ellas:

```bash
  npx prisma init
```

### Modelos en Prisma ORM

Para definir los modelos de la base de datos lo hacemos en el archivo `schema.prisma` que se encuentra en la raiz de nuestro proyecto. Se utiliza la palabra reservada `model` seguida del nombre de la tabla y dentro de las llaves `{}` se definen los campos de la tabla.

schema.prisma

```prisma
model Category {
  id        Int      @id @default(autoincrement())
  name      String   @unique
  slug      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Una vez tengamos lista nuestra tabla la vamos a agregar a la base de datos mediante el siguiente comando:

```bash
  npx prisma migrate dev --name categories_migration
```

Luego agregamos un nuevo modelo para la tabla `Product`:

schema.prisma

```prisma
model Category {
  id        Int       @id @default(autoincrement())
  name      String    @unique
  slug      String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  Product   Product[]
}

model Product {
  id         Int      @id @default(autoincrement())
  name       String
  price      Float
  image      String
  categoryId Int
  category   Category @relation(fields: [categoryId], references: [id])
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

Ahora debemos migrar la tabla `Product` a la base de datos:

```bash
  npx prisma migrate dev --name products_migration
```

### Seeding a la base de datos

Seeding es una forma en la cual puedes agregar datos a la base de datos, ya sea de prueba o en forma masiva a la base de datos de nuestra aplicacion. Estos datos se recomiendan que sean lo mas cercano a los datos que se van a encontrar en produccion para que las pruebas sean mas reales.

Lo primero que debemos hacer es instalar la dependencia de `ts-node` para poder ejecutar archivos de TypeScript en la terminal:

```bash
  npm install -D ts-node
```

El siguiente paso es crear dentro de la carpeta de `prisma` un archivo llamado `seed.ts` y dentro de este archivo vamos a agregar los datos que queremos agregar a la base de datos:

prisma/seed.ts

```ts
import { categories } from "./data/categories";
import { products } from "./data/products";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.category.createMany({
      data: categories,
    });
    await prisma.product.createMany({
      data: products,
    });
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    console.log("Seed completed");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
```

Ademas junto a la carpeta de migrations, vamos a crear una nueva carpeta `data` y dentro de esta carpeta vamos a agregar un archivo `categories.ts` y `products.ts` con los datos que queremos agregar a la base de datos.

Por ultimo debemos mandar a llamar el archivo `seeder.ts` desde el archivo `package.json` creando un nuevo script:

package.json

```json
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  },
```

Ya para agregar este conjunto de datos a la base de datos, debemos ejecutar el siguiente comando:

```bash
  npx prisma db seed
```

### Data Fetching en Next.js

En Next.js el Data Fetching se puede hacer hasta de 4 formas diferentes:

- Utilizando en el Servidor la funcion de `fetch()`
- En el Servidor con un ORM o Consutlas SQL
- En el Cliente con un `Route Handler` y una peticion GET
- En el Cliente con React Query, Axios, SWR u otras opciones

Primero vamos a definir en `libs/prisma.ts` la conexion a la base de datos utilizando el `Patron Singleton`:

```ts
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
```

Consultamos las categorias desde `order-sidebar.tsx`:

```tsx
import prismaClient from "@/libs/prisma";

const getCategories = async () => {
  return await prismaClient.category.findMany();
};

const OrderSidebar = async (props: Props) => {
  const categories = await getCategories();
  return <aside className="md:w-72 md:h-screen bg-white">OrderSidebar</aside>;
};

export default OrderSidebar;
```

### Iterando sobre las categorias

Vamos a iterar sobre las categorias que obtuvimos de la base de datos y las vamos a mostrar en el componente `order-sidebar.tsx`:

```tsx
import prismaClient from "@/libs/prisma";
import CategoryIcon from "../icons/category-icon";

type Props = {};

const getCategories = async () => {
  return await prismaClient.category.findMany();
};

const OrderSidebar = async (props: Props) => {
  const categories = await getCategories();
  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <nav className="mt-10">
        {categories.map((category) => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </nav>
    </aside>
  );
};

export default OrderSidebar;
```

En el Componente `category-icon.tsx` vamos a mostrar la categoria utilizando los `types` de Prisma:

```tsx
import { Category } from "@prisma/client";

type Props = {
  category: Category;
};

const CategoryIcon = ({ category }: Props) => {
  return <div>{category.name}</div>;
};

export default CategoryIcon;
```

### Mostrando Categorias e Iconos

Vamos a mostrar las categorias en el componente `category-icon.tsx` y vamos a agregar un icono a cada categoria:

```tsx
import Image from "next/image";
import Link from "next/link";
import { Category } from "@prisma/client";

type Props = {
  category: Category;
};

const CategoryIcon = ({ category }: Props) => {
  return (
    <div
      className={`flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
    >
      <div className="w-16 h-16 relative">
        <Image
          src={`/icon_${category.slug}.svg`}
          alt={category.name}
          fill
          // width={24}
          // height={24}
        />
      </div>
      <Link href={`/orders/${category.slug}`} className="text-xl font-bold">
        {category.name}
      </Link>
    </div>
  );
};

export default CategoryIcon;
```

### Routing Dinamico en Next.js

- Muchas veces quieres acceder a un recurso en la base de datos por medio de su ID o slug, ya sea para ver los detalles de un producto, leer una entrada de blog o datos de un cliente.
- En estos casos se utiliza el `Routing Dinamico` para poder acceder a estos recursos de manera mas sencilla.
- En `App Router`, la forma en la que generas el `Routing Dinamico` es con una carpeta y un nombre entre corchetes `[]`, por ejemplo `/products/[id]` o `/products/[slug]`, o `/payments/[paymentId]`.

Dentro de la carpeta `orders` vamos a crear una nueva carpeta llamada `[category]` y dentro de esta carpeta vamos a crear un archivo `page.tsx`, el cual va a ser el componente que se va a renderizar cuando se acceda a la URL `/orders/[category]` y este nuevo `page.tsx` se va a insertar en el layout de `orders/layout.tsx`, en el mismo por medio de Props vamos a tener acceso a la categoria que se esta accediendo mediante la URL atraves de `params`.

orders/[category]/page.tsx

```tsx
type Props = {
  params: {
    category: string;
  };
};

export default function OrdersPage({ params: { category } }: Props) {
  return <div>{category}</div>;
}
```

Ademas, en caso de no encontrar la categoria en la base de datos, podemos crear una pagina de `Not Found` en la carpeta `app/not-found.tsx` o `orders/[category]/not-found.tsx`:

```tsx
type Props = {};

export default function NotFoundPage({}: Props) {
  return <div>NotFoundPage</div>;
}
```

### Detectar la Categoria actual y Obtener los Productos

Ya hemos implementado el `Routing Dinamico` en Next.js y ya estamos leyendo los parametros desde la URL por medio de los `params` en el componente `orders/[category]/page.tsx`, ahora vamos a obtener la categoria actual y los productos de esa categoria.

De la forma en que funciona Prisma, para traer todos los productos de una categoria, no es necesario realizar una consulta con un `where` por el ID de la Categoria o un `findMany`, sino que podemos acceder a los productos de una categoria por medio de la relacion que se establecio en el modelo de la tabla `Category`:

orders/[category]/page.tsx

```tsx
import prismaClient from "@/libs/prisma";

type Props = {
  params: {
    category: string;
  };
};

const getProducts = async (category: string) => {
  try {
    const products = await prismaClient.product.findMany({
      where: {
        category: {
          slug: category,
        },
      },
    });
    return products;
  } catch (error) {
    console.log(error);
  }
};

export default async function OrdersPage({ params: { category } }: Props) {
  const products = await getProducts(category);
  return <div>{category}</div>;
}
```

### Iterando sobre los Productos

Dentro de `/components` vamos a generar la carpeta de `/products` y dentro el componente Card para cada uno de los productos:

orders/[category]/page.tsx

```tsx
import ProductCard from "@/components/products/product-card";
import prismaClient from "@/libs/prisma";

type Props = {
  params: {
    category: string;
  };
};

const getProducts = async (category: string) => {
  try {
    const products = await prismaClient.product.findMany({
      where: {
        category: {
          slug: category,
        },
      },
    });
    return products;
  } catch (error) {
    console.log(error);
  }
};

export default async function OrdersPage({ params: { category } }: Props) {
  const products = await getProducts(category);
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
```

components/products/product-card.tsx

```tsx
import { Product } from "@prisma/client";
import { formatCurrency } from "@/utils";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="border bg-white">
      <div className="p-5">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          ${formatCurrency(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
```

Vamos a crear en `src/utils/index.ts` una funcion que nos permita formatear el precio de los productos:

```ts
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
```

### Finalizando los Card de Productos

Vamos a agregar la imagen del producto y el boton de agregar al carrito en el componente `product-card.tsx`:

```tsx
import { Product } from "@prisma/client";
import { formatCurrency } from "@/utils";
import Image from "next/image";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="border bg-white">
      <Image
        src={`/products/${product.image}.jpg`}
        alt={product.name}
        width={300}
        height={300}
        quality={80}
        className="w-full h-full object-cover"
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          ${formatCurrency(product.price)}
        </p>
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
```

### Resaltando la Categoria Actual

La propiedad `params` de Next.js nos permite acceder a los parametros de la URL, en este caso a la categoria que se esta accediendo. Es importante destacar que solo se encuentra disponible y puede ser utilizado en los siguientes archivos o componentes:

- layout.tsx
- page.tsx
- route.tsx
- generateMetadata Functions

Ademas, algo importante a destacar de Next.js, es que las consultas a la Base de Datos Postgresql se quedan cacheadas en el servidor, por lo que si se cambia de categoria, la pagina no se va a recargar, por lo que no se va a volver a ejecutar la consulta a la base de datos o si vamos a otra categoria y volvemos a la anterior, la consulta a la base de datos no se va a volver a ejecutar.

Teniendo eso en cuenta, vamos a resaltar la categoria actual en el componente `category-icon.tsx` mediante el uso de `useParams` de Next.js:

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Category } from "@prisma/client";

type Props = {
  category: Category;
};

const CategoryIcon = ({ category }: Props) => {
  const { category: currentCategory } = useParams<{ category: string }>();
  return (
    <div
      className={`${
        category.slug === currentCategory && "bg-amber-400"
      } flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
    >
      <div className="w-16 h-16 relative">
        <Image
          src={`/icon_${category.slug}.svg`}
          alt={category.name}
          fill
          // width={24}
          // height={24}
        />
      </div>
      <Link href={`/orders/${category.slug}`} className="text-xl font-bold">
        {category.name}
      </Link>
    </div>
  );
};

export default CategoryIcon;
```

### Creando el Store de Zustand

Debido a la naturaleza Server Side de Next.js junto al manejo de estado por medio de URLs, libreras para manejar `estados globales` del lado del `cliente` han ido perdiendo popularidad, pero en este caso es necesario mantener un estado global con el pedido del cliente, por lo cual vamos a instalar la libreria de `Zustand`:

```bash
  npm install zustand
```

Vamos a crear el store de `Zustand` en el archivo `src/store/store.ts`:

```ts
import { create } from "zustand";
import { OrderItem } from "@/types";

interface Store {
  order: OrderItem[];
}

export const useStore = create<Store>((set) => ({
  order: [],
}));
```

Ademas vamos a crear el tipo de dato `OrderItem` en el archivo `src/types/index.d.ts`:

```ts
import { Product } from "@prisma/client";

export type OrderItem = Pick<Product, "id" | "name" | "price"> & {
  quantity: number;
  subtotal: number;
};
```

### Consumir el State de Orden

Vamos a consumir el estado de la orden en el componente `order-summary.tsx`:

```tsx
"use client";

import { useStore } from "@/store/store";

type Props = {};

const OrderSummary = (props: Props) => {
  const order = useStore((state) => state.order);
  console.log(order);

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El carrito está vacio</p>
      ) : (
        <ul>
          {order.map((item) => (
            <li key={item.id} className="flex justify-between my-2">
              <p>{item.name}</p>
              <p>{item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default OrderSummary;
```

### Comunicar el Boton con el Store

Vamos a comunicar el boton de `Agregar al Carrito` con el store de `Zustand` en el componente `product-card.tsx`, algo importante a resaltar es que no debemos definir todo el Componente como `Client Side`, sino solo la funcion que se va a ejecutar al hacer click en el boton, debido a que React en Next.js se ejecuta primero el Servidor y luego el Cliente por lo que no vamos a hacer que solo por la pequeña parte del boton con el `onClick()` tarde en ejecutarse todo el componente:

product-card.tsx

```tsx
import Image from "next/image";
import AddProductButton from "./add-product-button";
import { Product } from "@prisma/client";
import { formatCurrency } from "@/utils";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="border bg-white">
      <Image
        src={`/products/${product.image}.jpg`}
        alt={product.name}
        width={300}
        height={300}
        quality={80}
        className="w-full h-full object-cover"
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatCurrency(product.price)}
        </p>
        <AddProductButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
```

add-product-button.tsx

```tsx
"use client";
import { useStore } from "@/store/store";
import { Product } from "@prisma/client";

type Props = {
  product: Product;
};

const AddProductButton = ({ product }: Props) => {
  const addToOrder = useStore((state) => state.addToOrder);
  return (
    <button
      type="button"
      onClick={() => addToOrder(product)}
      className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
    >
      Agregar
    </button>
  );
};

export default AddProductButton;
```

Em el Store de `Zustand` vamos a agregar la funcion `addToOrder` para agregar un producto al carrito:

```ts
import { create } from "zustand";
import { OrderItem } from "@/types";
import { Product } from "@prisma/client";

interface Store {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
}

export const useStore = create<Store>((set) => ({
  order: [],
  addToOrder: (product) => {
    console.log(`Agregando producto: ${product.name}`);
  },
}));
```

### Agregar Productos a la Orden

Para agregar productos al carrito, vamos a utilizar la funcion `addToOrder` en el store de `Zustand`:

```ts
import { create } from "zustand";
import { OrderItem } from "@/types";
import { Product } from "@prisma/client";

interface Store {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
}

export const useStore = create<Store>((set) => ({
  order: [],
  addToOrder: (product) => {
    console.log(`Agregando producto: ${product.name}`);

    const { categoryId, image, createdAt, updatedAt, ...data } = product;

    set((state) => ({
      order: [
        ...state.order,
        {
          ...data,
          quantity: 1,
          subtotal: data.price,
        },
      ],
    }));
  },
}));
```
