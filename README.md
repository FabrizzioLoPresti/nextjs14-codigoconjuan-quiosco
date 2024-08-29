# Curso React.js Codigo con Juan - Quiosco App

[Curso React y TypeScript - La Guía Completa Creando +10 Proyectos](https://www.udemy.com/course/react-de-principiante-a-experto-creando-mas-de-10-aplicaciones)

## Tech Stack

- TypeScript
- React.js 18
- Next.js 14
- Tailwind CSS
- HeroIcons React
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

### Mostrando los Articulos de la Orden

Vamos a listar los articulos de la orden dentro del componente `order-summary.tsx`. Como este componente va a ser demasiado grande creamos un nuevo compoenten `product-details.tsx`. Ademas instalamos HeroIcons para React con `npm i @heroicons/react`.

order-summary.tsx

```tsx
"use client";

import { useStore } from "@/store/store";
import ProductDetails from "./product-details";

type Props = {};

const OrderSummary = (props: Props) => {
  const order = useStore((state) => state.order);

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El carrito está vacio</p>
      ) : (
        <ul>
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
        </ul>
      )}
    </aside>
  );
};

export default OrderSummary;
```

product-details.tsx

```tsx
import { MinusIcon, XCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { OrderItem } from "@/types";
import { formatCurrency } from "@/utils";

type Props = {
  item: OrderItem;
};

const ProductDetails = ({ item }: Props) => {
  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button type="button" onClick={() => {}}>
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">
          {formatCurrency(item.price)}
        </p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button type="button" onClick={() => {}}>
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          <button type="button" onClick={() => {}}>
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {""}
          <span className="font-normal">{formatCurrency(item.subtotal)}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
```

### Evitar Duplicados

Lo vamos a validar mediante el Store de Zustand, donde vamos a verificar que si el item ya se encuentra en el arreglo entonces vamos a aumentar la cantidad, en caso contrario de que no se encuentre en el arreglo lo vamos a agregar. Como dentro de la funcion de `set(state)` no podemos escribir condicionales, debemos utilizar la funcion `get` propia de Zustand que nos permite obtener el estado actual del Store.

store.ts

```ts
import { create } from "zustand";
import { OrderItem } from "@/types";
import { Product } from "@prisma/client";

interface Store {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
}

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {
    const { categoryId, image, createdAt, updatedAt, ...data } = product;
    const currentOrder = get().order;

    const itemExists = currentOrder.some((item) => item.id === data.id);

    set({
      order: itemExists
        ? [
            ...currentOrder.map((item) =>
              item.id === data.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    subtotal: item.price * (item.quantity + 1),
                  }
                : item
            ),
          ]
        : [
            ...currentOrder,
            {
              ...data,
              quantity: 1,
              subtotal: data.price,
            },
          ],
    });
  },
}));
```

### Incremento la cantidad de un articulo

Dentro del Store de Zustand vamos a crear una nueva funcion `increaseQuantity` que nos permita aumentar la cantidad de un articulo en la orden, lo mismo vamos a hacer con la funcion `decreaseQuantity` para disminuir la cantidad de un articulo en la orden.

store.ts

```ts
import { create } from "zustand";
import { OrderItem } from "@/types";
import { Product } from "@prisma/client";

interface Store {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
}

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {
    const { categoryId, image, createdAt, updatedAt, ...data } = product;
    const currentOrder = get().order;

    const itemExists = currentOrder.some((item) => item.id === data.id);

    set({
      order: itemExists
        ? [
            ...currentOrder.map((item) =>
              item.id === data.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    subtotal: item.price * (item.quantity + 1),
                  }
                : item
            ),
          ]
        : [
            ...currentOrder,
            {
              ...data,
              quantity: 1,
              subtotal: data.price,
            },
          ],
    });
  },
  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      ),
    }));
  },
  decreaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
              subtotal: item.price * (item.quantity - 1),
            }
          : item
      ),
    }));
  },
}));
```

Utilizamos la funcion `increaseQuantity` en el componente `product-details.tsx`:

```tsx
import { MinusIcon, XCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useStore } from "@/store/store";
import { OrderItem } from "@/types";
import { formatCurrency } from "@/utils";

type Props = {
  item: OrderItem;
};

const ProductDetails = ({ item }: Props) => {
  const increaseQuantity = useStore((state) => state.increaseQuantity);
  const decreaseQuantity = useStore((state) => state.decreaseQuantity);

  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button type="button" onClick={() => {}}>
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">
          {formatCurrency(item.price)}
        </p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button type="button" onClick={() => decreaseQuantity(item.id)}>
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          <button type="button" onClick={() => increaseQuantity(item.id)}>
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {""}
          <span className="font-normal">{formatCurrency(item.subtotal)}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
```

### Decrementar la cantidad de un articulo

Vamos a drecrementar la cantidad de un articulo en la orden mediante la funcion `decreaseQuantity` en el componente `product-details.tsx`, para ello en la funcion del Store de Zustand debemos validar que la cantidad del articulo sea mayor a 1, en caso contrario de que sea igual a 1, entonces vamos a eliminar el articulo de la orden.

store.ts

```ts
import { create } from "zustand";
import { OrderItem } from "@/types";
import { Product } from "@prisma/client";

interface Store {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
}

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {
    const { categoryId, image, createdAt, updatedAt, ...data } = product;
    const currentOrder = get().order;

    const itemExists = currentOrder.some((item) => item.id === data.id);

    set({
      order: itemExists
        ? [
            ...currentOrder.map((item) =>
              item.id === data.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    subtotal: item.price * (item.quantity + 1),
                  }
                : item
            ),
          ]
        : [
            ...currentOrder,
            {
              ...data,
              quantity: 1,
              subtotal: data.price,
            },
          ],
    });
  },
  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      ),
    }));
  },
  decreaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
              subtotal: item.price * (item.quantity - 1),
            }
          : item
      ),
    }));
  },
}));
```

Hacemos uso del Hook de `useMemo` de React para deshabilitar los botones de incrementar y decrementar la cantidad de un articulo en el componente `product-details.tsx`, se utiliza este Hook para que no se vuelva a renderizar el componente cada vez que se incremente o decremente la cantidad de un articulo. En este caso se utiliza para memorizar el resultado de la comparación `(item.quantity === 1)`. Este valor solo se recalculará si `item.quantity` cambia, lo que puede ahorrar tiempo de procesamiento si el componente se renderiza frecuentemente pero la cantidad no cambia. Si no cambia `item.quantity` entonces el valor de `disableDecreaseButton` no se va a volver a calcular, por ejemplo cada vez que se rerenderiza el componente `product-details.tsx` cuando se agrega un nuevo articulo a la orden desde el componente `order-summary.tsx`.

#### Explicacion de `useMemo`

Cuando utilizas `useMemo` para memorizar el resultado de una operación o un cálculo, como en este caso, estás optimizando la renderización del componente al evitar cálculos innecesarios para cada renderizado. Vamos a detallar cómo funciona en el contexto de tu ejemplo:

**Comportamiento de useMemo en tu Componente**
**Agregar un nuevo producto a la orden:**

- Cuando se agrega un nuevo producto a la orden, la lista de productos se actualiza y el componente de la lista se vuelve a renderizar.
- Debido a que la lista se vuelve a renderizar, todos los componentes individuales de `ProductDetails` de cada producto en la lista también se vuelven a renderizar.

**Re-render de componentes existentes:**

- Para los productos que ya estaban en la lista antes de agregar el nuevo producto, el componente `ProductDetails` se volverá a renderizar debido al re-render de la lista completa.
- Sin useMemo: Sin useMemo, cada re-render de un componente `ProductDetails` recalcularía si el botón de aumentar o disminuir cantidad debe estar deshabilitado, incluso si la cantidad del producto no ha cambiado.
- Con useMemo: Con useMemo, el cálculo para `disableDecreaseButton` y `disableIncreaseButton` se memorizó. Esto significa que estos cálculos solo se ejecutarán de nuevo si la dependencia `item.quantity` cambia.

**¿Por qué es útil useMemo aquí?**

- Evitación de cálculos innecesarios: Cuando se agrega un nuevo producto a la orden y `item.quantity` para los productos existentes no ha cambiado, `useMemo` evitará recalcular si los botones de aumentar o disminuir cantidad deben estar deshabilitados. Esto es especialmente útil si el componente `ProductDetails` se renderiza muchas veces (por ejemplo, en una lista larga de productos).

Mejora de rendimiento: Aunque los cálculos que estás realizando son muy simples (una comparación numérica), evitar incluso estos pequeños cálculos puede mejorar el rendimiento, especialmente si se realizan en múltiples componentes al mismo tiempo.

Resumiendo:
Sí, cuando utilizas useMemo en el componente `ProductDetails`, los productos que ya existen en la orden no volverán a calcular si el botón estará desactivado o no, a menos que cambie `item.quantity` para ese producto específico. Esto reduce la carga de procesamiento innecesaria en el re-renderizado y optimiza el rendimiento del componente.

product-details.tsx

```tsx
import { MinusIcon, XCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useStore } from "@/store/store";
import { OrderItem } from "@/types";
import { formatCurrency } from "@/utils";
import { useMemo } from "react";

type Props = {
  item: OrderItem;
};

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 5;

const ProductDetails = ({ item }: Props) => {
  const increaseQuantity = useStore((state) => state.increaseQuantity);
  const decreaseQuantity = useStore((state) => state.decreaseQuantity);
  const disableDecreaseButton = useMemo(
    () => item.quantity === MIN_QUANTITY,
    [item.quantity]
  );
  const disableIncreaseButton = useMemo(
    () => item.quantity === MAX_QUANTITY,
    [item.quantity]
  );

  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button type="button" onClick={() => {}}>
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">
          {formatCurrency(item.price)}
        </p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            disabled={disableDecreaseButton}
            className="disabled:opacity-20"
          >
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            disabled={disableIncreaseButton}
            className="disabled:opacity-20"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {""}
          <span className="font-normal">{formatCurrency(item.subtotal)}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
```

### Eliminar articulos de la orden

Vamos a definir dentro del Store de Zustand la funcion `removeItem` que nos permita eliminar un articulo de la orden. Luego vamos a utilizar esta funcion en el componente `product-details.tsx`:

store.ts

```ts
import { create } from "zustand";
import { OrderItem } from "@/types";
import { Product } from "@prisma/client";

interface Store {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
  removeItem: (id: Product["id"]) => void;
}

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {
    const { categoryId, image, createdAt, updatedAt, ...data } = product;
    const currentOrder = get().order;

    const itemExists = currentOrder.some((item) => item.id === data.id);

    set({
      order: itemExists
        ? [
            ...currentOrder.map((item) =>
              item.id === data.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    subtotal: item.price * (item.quantity + 1),
                  }
                : item
            ),
          ]
        : [
            ...currentOrder,
            {
              ...data,
              quantity: 1,
              subtotal: data.price,
            },
          ],
    });
  },
  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      ),
    }));
  },
  decreaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
              subtotal: item.price * (item.quantity - 1),
            }
          : item
      ),
    }));
  },
  removeItem: (id) => {
    set((state) => ({
      order: state.order.filter((item) => item.id !== id),
    }));
  },
}));
```

product-details.tsx

```tsx
import { useMemo } from "react";
import { MinusIcon, XCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useStore } from "@/store/store";
import { OrderItem } from "@/types";
import { formatCurrency } from "@/utils";

type Props = {
  item: OrderItem;
};

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 5;

const ProductDetails = ({ item }: Props) => {
  const increaseQuantity = useStore((state) => state.increaseQuantity);
  const decreaseQuantity = useStore((state) => state.decreaseQuantity);
  const removeItem = useStore((state) => state.removeItem);
  const disableDecreaseButton = useMemo(
    () => item.quantity === MIN_QUANTITY,
    [item.quantity]
  );
  const disableIncreaseButton = useMemo(
    () => item.quantity === MAX_QUANTITY,
    [item.quantity]
  );

  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button type="button" onClick={() => removeItem(item.id)}>
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">
          {formatCurrency(item.price)}
        </p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            disabled={disableDecreaseButton}
            className="disabled:opacity-20"
          >
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            disabled={disableIncreaseButton}
            className="disabled:opacity-20"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {""}
          <span className="font-normal">{formatCurrency(item.subtotal)}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
```

### Calculando el Total a Pagar

Vaos a calcular el total a pagar de la orden en el componente `order-summary.tsx`:

**¿Qué hace useMemo en este caso?**

- Cálculo del Total de la Orden: El código utiliza useMemo para memorizar el resultado del cálculo del total de la orden (total). Este cálculo suma los subtotales de todos los elementos (item.subtotal) en la lista de la orden (order).

- Dependencia del Hook: El cálculo se vuelve a realizar solo si la dependencia order cambia. Es decir, si se agrega o elimina un producto de la orden, o si cambia la cantidad de un producto, provocando un cambio en order.

**¿Por qué utilizar useMemo aquí?**
**Optimización del Rendimiento:**

- Sin useMemo: Cada vez que el componente OrderSummary se renderiza, el cálculo del total se ejecutaría de nuevo, incluso si la lista order no ha cambiado. Esto puede ser ineficiente si el cálculo es costoso o si se tiene una lista grande de productos.
- Con useMemo: El cálculo solo se realiza nuevamente si la lista order cambia. Esto significa que mientras la lista de productos en la orden siga igual (sin adiciones, eliminaciones o cambios de cantidad), el valor calculado de total será memorizado y reutilizado en lugar de recalcularse. Esto evita cálculos innecesarios y mejora el rendimiento.

**Cálculo Condicional:**

- useMemo ayuda a que el cálculo del total sea condicional, dependiendo solo de cambios en la lista order. Si order no cambia entre renderizados, el cálculo no se ejecuta de nuevo, lo que puede ahorrar procesamiento y hacer que la aplicación sea más eficiente.

**Ejemplo de Comportamiento:**
Imaginemos que el componente OrderSummary se renderiza varias veces por algún motivo (por ejemplo, cambios de estado en otros lugares de la aplicación o interacciones del usuario que no afectan a la orden):

- Con useMemo: Si no se ha modificado la lista order, el cálculo de total no se ejecutará de nuevo. El componente reutilizará el valor memorizado de total, optimizando así el rendimiento.

- Sin useMemo: Cada renderizado del componente recalcularía el total, sumando nuevamente los subtotales de los productos en la lista order, incluso si no ha cambiado, resultando en cálculos redundantes e innecesarios.

**Conclusión**
Usar useMemo en este componente es una buena práctica porque:

- Previene cálculos innecesarios: Al recalcular el total solo cuando cambia order, se mejora el rendimiento y se evita procesamiento innecesario.
- Optimiza la renderización: Esto es particularmente útil en aplicaciones React donde el rendimiento es importante, especialmente cuando se manejan listas de datos que pueden ser grandes o costosas de procesar.

En resumen, useMemo asegura que el cálculo del total de la orden solo se ejecute cuando sea necesario, es decir, cuando la lista de productos en la orden cambie, mejorando así la eficiencia de la aplicación.

```tsx
"use client";

import { useMemo } from "react";
import ProductDetails from "./product-details";
import { useStore } from "@/store/store";
import { formatCurrency } from "@/utils";

type Props = {};

const OrderSummary = (props: Props) => {
  const order = useStore((state) => state.order);
  const total = useMemo(() => {
    return order.reduce((total, item) => total + item.subtotal, 0);
  }, [order]);

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El carrito está vacio</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
          <p className="text-2xl mt-20 text-center">
            Total a pagar: {""}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>
        </div>
      )}
    </aside>
  );
};

export default OrderSummary;
```

### Creando el Modelo de Ordenes

Veamos como almacenar las Ordenes en la Base de Datos, para ello vamos a crear un nuevo modelo de `Order` en el archivo `prisma/schema.prisma`, ademas de crear una Tabla Pivote `OrderProduct` que va a relacionar las ordenes con los productos:

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Category {
  id        Int       @id @default(autoincrement())
  name      String    @unique
  slug      String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  Product   Product[]
}

model Product {
  id           Int            @id @default(autoincrement())
  name         String
  price        Float
  image        String
  categoryId   Int
  category     Category       @relation(fields: [categoryId], references: [id])
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
  OrderProduct OrderProduct[]
}

model Order {
  id           Int            @id @default(autoincrement())
  name         String
  total        Float
  status       Boolean        @default(false)
  orderReadyAt DateTime?
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
  OrderProduct OrderProduct[]
}

model OrderProduct {
  id        Int     @id @default(autoincrement())
  orderId   Int
  order     Order   @relation(fields: [orderId], references: [id])
  productId Int
  product   Product @relation(fields: [productId], references: [id])
}

```

Una vez realizados los cambios en el archivo `prisma/schema.prisma`, vamos a aplicar las migraciones a la Base de Datos:

```bash
npx prisma migrate dev --name add-orders
```

### Introduccion a los Server Actions de Next.js 14

Anteriormente para insertar los datos en nuestra base de datos debiamos crear un objeto de tipo JSON, enviarlo por metodo POST a la URL de nuestra API y recien ahi insertar los datos. Pero con la llegada de Next.js 14, se introducen los `Server Actions` que nos permiten ejecutar codigo del lado del servidor de Next.js, lo cual nos permite realizar operaciones de lectura y escritura en la base de datos de forma directa, sin la necesidad de enviar los datos por medio de una API.

- Los `Server Actions` son funciones asincronas que se ejecutan en el servidor, se pueden utilizar con clientes de Componente y Servidor.
- Se utilizan para crear datos o mutarlos, y estan muy unidos al CRUD.
- Utilizan la directiva `use server`, que en el caso de Componentes de Servidor debe ser la primer linea de la funcion, mientras que en Client Components se deben importar de otro archivo, que en la aprte superior debe tener esta directiva.
- Los `Server Actions` deben estar dentro del atributo `action={}` de un formulario `<form>`.
- Tambien pueden ser llamados dentro de un `useEffect` o un `onClick` de un boton.
- No son exclusivos de `Next.js 14 o Next.js 15`, ya que `React` en la `Version 19` los va a tener incorporados.

Dicho `action` lo vamos a implementar dentro de un `form` con un `button` de tipo `submit` en el componente `order-summary.tsx`:

```tsx
"use client";

import { useMemo } from "react";
import ProductDetails from "./product-details";
import { useStore } from "@/store/store";
import { formatCurrency } from "@/utils";

type Props = {};

const OrderSummary = (props: Props) => {
  const order = useStore((state) => state.order);
  const total = useMemo(() => {
    return order.reduce((total, item) => total + item.subtotal, 0);
  }, [order]);

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El pedido está vacio</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
          <p className="text-2xl mt-20 text-center">
            Total a pagar: {""}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>

          <form action="" className="w-full mt-10 space-y-5">
            <button
              type="submit"
              className="py-2 rounded uppercase text-white font-bold bg-black w-full text-center cursor-pointer"
            >
              Confirmar pedido
            </button>
          </form>
        </div>
      )}
    </aside>
  );
};

export default OrderSummary;
```

### Creando un Server Action

Dentro del Componente `order-summary.tsx` vamos a llamar a un `Server Action` que nos permita insertar los datos de la orden en la Base de Datos, para ello vamos a utilizar la directiva `useServer` dentro del archivo de actions `src/actions/actions.ts` que va a ser llamada cuando se envie el formulario:

src/actions/actions.ts

```ts
"use server";

export const createOrder = async () => {
  console.log("Creating order...");
};
```

order-summary.tsx

```tsx
"use client";

import { useMemo } from "react";
import ProductDetails from "./product-details";
import { useStore } from "@/store/store";
import { formatCurrency } from "@/utils";
import { createOrder } from "@/actions/actions";

type Props = {};

const OrderSummary = (props: Props) => {
  const order = useStore((state) => state.order);
  const total = useMemo(() => {
    return order.reduce((total, item) => total + item.subtotal, 0);
  }, [order]);

  const handleCreateOrder = async (formData: FormData) => {
    await createOrder();
  };

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El pedido está vacio</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
          <p className="text-2xl mt-20 text-center">
            Total a pagar: {""}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>

          <form action={handleCreateOrder} className="w-full mt-10 space-y-5">
            <button
              type="submit"
              className="py-2 rounded uppercase text-white font-bold bg-black w-full text-center cursor-pointer"
            >
              Confirmar pedido
            </button>
          </form>
        </div>
      )}
    </aside>
  );
};

export default OrderSummary;
```

### Recuperar Datos de Formulario con FormData

Vamos a recuperar los datos del formulario con `FormData` en el `Server Action` que se encuentra en el archivo `src/actions/actions.ts`:

src/actions/actions.ts

```ts
"use server";

export const createOrder = async (name: string) => {
  console.log(name);
};
```

order-summary.tsx

```tsx
"use client";

import { useMemo } from "react";
import ProductDetails from "./product-details";
import { useStore } from "@/store/store";
import { formatCurrency } from "@/utils";
import { createOrder } from "@/actions/actions";

type Props = {};

const OrderSummary = (props: Props) => {
  const order = useStore((state) => state.order);
  const total = useMemo(() => {
    return order.reduce((total, item) => total + item.subtotal, 0);
  }, [order]);

  const handleCreateOrder = async (formData: FormData) => {
    await createOrder(formData.get("name") as string);
  };

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El pedido está vacio</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
          <p className="text-2xl mt-20 text-center">
            Total a pagar: {""}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>

          <form action={handleCreateOrder} className="w-full mt-10 space-y-5">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Tu nombre"
              className="bg-white border border-gray-100 p-2 w-full"
            />
            <button
              type="submit"
              className="py-2 rounded uppercase text-white font-bold bg-black w-full text-center cursor-pointer"
            >
              Confirmar pedido
            </button>
          </form>
        </div>
      )}
    </aside>
  );
};

export default OrderSummary;
```

### Validacion de Datos con ZOD en el Cliente

Vamos a realizar validaciones de datos con `Zod` tanto del lado del Cliente como del lado del Servidor. Primero vamos a instalar la libreria de `Zod`:

```bash
npm install zod
```

Luego vamos a crear un esquema de validacion en el archivo `src/schemas/order.ts`:

src/schemas/index.ts

```ts
import { z } from "zod";

export const OrderSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
});
```

src/actions/actions.ts

```ts
"use server";

export const createOrder = async () => {
  console.log("Creating order...");
};
```

order-summary.tsx

```tsx
"use client";

import { useMemo } from "react";
import ProductDetails from "./product-details";
import { OrderSchema } from "@/schema";
import { createOrder } from "@/actions/actions";
import { useStore } from "@/store/store";
import { formatCurrency } from "@/utils";

type Props = {};

const OrderSummary = (props: Props) => {
  const order = useStore((state) => state.order);
  const total = useMemo(() => {
    return order.reduce((total, item) => total + item.subtotal, 0);
  }, [order]);

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
    };

    const result = OrderSchema.safeParse(data);
    console.log(result);

    await createOrder();
  };

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El pedido está vacio</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
          <p className="text-2xl mt-20 text-center">
            Total a pagar: {""}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>

          <form action={handleCreateOrder} className="w-full mt-10 space-y-5">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Tu nombre"
              className="bg-white border border-gray-100 p-2 w-full"
            />
            <button
              type="submit"
              className="py-2 rounded uppercase text-white font-bold bg-black w-full text-center cursor-pointer"
            >
              Confirmar pedido
            </button>
          </form>
        </div>
      )}
    </aside>
  );
};

export default OrderSummary;
```

### Mostrando Errores de Validacion con Sonner

Vamos a mostrar los errores de validacion con `Sonner`, primero vamos a instalar la libreria de `Sonner`:

```bash
npm install sonner
```

Mostremos los errores de validacion en el componente `order-summary.tsx`:

```tsx
"use client";

import { useMemo } from "react";
import { Toaster, toast } from "sonner";
import ProductDetails from "./product-details";
import { useStore } from "@/store/store";
import { createOrder } from "@/actions/actions";
import { OrderSchema } from "@/schema";
import { formatCurrency } from "@/utils";

type Props = {};

const OrderSummary = (props: Props) => {
  const order = useStore((state) => state.order);
  const total = useMemo(() => {
    return order.reduce((total, item) => total + item.subtotal, 0);
  }, [order]);

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
    };

    const result = OrderSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    await createOrder();
  };

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El pedido está vacio</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
          <p className="text-2xl mt-20 text-center">
            Total a pagar: {""}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>

          <form action={handleCreateOrder} className="w-full mt-10 space-y-5">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Tu nombre"
              className="bg-white border border-gray-100 p-2 w-full"
            />
            <button
              type="submit"
              className="py-2 rounded uppercase text-white font-bold bg-black w-full text-center cursor-pointer"
            >
              Confirmar pedido
            </button>
          </form>
          <Toaster position="top-right" richColors />
        </div>
      )}
    </aside>
  );
};

export default OrderSummary;
```

### Validacion de Datos con Zod en el Servidor

Anteriormente validamos los datos del formulario con `Zod` del lado del Cliente y mostramos una notificacion de error con `Sonner`. Ahora vamos a realizar la validacion de los datos del formulario con `Zod` del lado del Servidor, para ello vamos a modificar el `Server Action` que se encuentra en el archivo `src/actions/actions.ts`:

src/actions/actions.ts

```ts
"use server";

import { OrderSchema } from "@/schema";

export const createOrder = async (data: unknown) => {
  const result = OrderSchema.safeParse(data);

  if (!result.success) {
    return {
      status: 400,
      body: result.error.issues,
    };
  }

  try {
  } catch (error) {
    return {
      status: 500,
      body: [{ message: "Ocurrió un error al crear el pedido" }],
    };
  }
};
```

order-summary.tsx

```tsx
const handleCreateOrder = async (formData: FormData) => {
  const data = {
    name: formData.get("name"),
  };

  const result = OrderSchema.safeParse(data);

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      toast.error(issue.message);
    });
    return;
  }

  const response = await createOrder(data);

  if (response?.status === 400) {
    response.body.forEach((issue) => {
      toast.error(issue.message);
    });
    return;
  }
};
```

### Validando el resto de la Orden

Vamos a validar el resto de la orden en el `schema` de `Zod` en el archivo `src/schemas/order.ts`, debemos copiar los tipos de `OrderItem` desde el archivo `src/types/index.ts`, ya que no es facil utilizar en Zod los tipos de datos del schema de Prisma:

src/schemas/order.ts

```ts
import { z } from "zod";

export const OrderSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  total: z.number().min(1, "El total es requerido"),
  order: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      subtotal: z.number(),
    })
  ),
});
```

Luego agregamos en el componente `order-summary.tsx` la validacion de los productos de la orden:

```tsx
"use client";

import { useMemo } from "react";
import { Toaster, toast } from "sonner";
import ProductDetails from "./product-details";
import { useStore } from "@/store/store";
import { createOrder } from "@/actions/actions";
import { OrderSchema } from "@/schema";
import { formatCurrency } from "@/utils";

type Props = {};

const OrderSummary = (props: Props) => {
  const order = useStore((state) => state.order);
  const total = useMemo(() => {
    return order.reduce((total, item) => total + item.subtotal, 0);
  }, [order]);

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total,
      order,
    };

    const result = OrderSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await createOrder(data);

    if (response?.status === 400) {
      response.body.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
  };

  return (
  );
};

export default OrderSummary;
```

### Ingresar datos a la base de datos

Vamos a ingresar los datos a la base de datos en el `Server Action` que se encuentra en el archivo `src/actions/actions.ts`, una vez validados los datos tanto en cliente como en servidor utilizando `Zod`:

src/actions/actions.ts

```ts
"use server";

import prismaClient from "@/libs/prisma";
import { OrderSchema } from "@/schema";

export const createOrder = async (data: unknown) => {
  const result = OrderSchema.safeParse(data);

  if (!result.success) {
    return {
      status: 400,
      body: result.error.issues,
    };
  }

  try {
    const response = await prismaClient.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        OrderProduct: {
          create: result.data.order.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        },
      },
    });

    console.log(response);
  } catch (error) {
    return {
      status: 500,
      body: [{ message: "Ocurrió un error al crear el pedido" }],
    };
  }
};
```

### Evitar Ordenes Duplicadas

Vamos a limpiar la orden una vez que se haya creado la orden en la base de datos, esto lo vamos a realizar luego de que la respuesta de la creacion de la orden sea exitosa, dentro del componente `order-summary.tsx`, para ello primero vamos a crear la funcion para limpiar el estado dentro de `store.ts`:

store.ts

```ts
import { create } from "zustand";
import { OrderItem } from "@/types";
import { Product } from "@prisma/client";

interface Store {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
  removeItem: (id: Product["id"]) => void;
  clearOrder: () => void;
}

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {
    const { categoryId, image, createdAt, updatedAt, ...data } = product;
    const currentOrder = get().order;

    const itemExists = currentOrder.some((item) => item.id === data.id);

    set({
      order: itemExists
        ? [
            ...currentOrder.map((item) =>
              item.id === data.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    subtotal: item.price * (item.quantity + 1),
                  }
                : item
            ),
          ]
        : [
            ...currentOrder,
            {
              ...data,
              quantity: 1,
              subtotal: data.price,
            },
          ],
    });
  },
  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      ),
    }));
  },
  decreaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
              subtotal: item.price * (item.quantity - 1),
            }
          : item
      ),
    }));
  },
  removeItem: (id) => {
    set((state) => ({
      order: state.order.filter((item) => item.id !== id),
    }));
  },
  clearOrder: () => {
    set({
      order: [],
    });
  },
}));
```

order-summary.tsx

```tsx
"use client";

import { useMemo } from "react";
import { Toaster, toast } from "sonner";
import ProductDetails from "./product-details";
import { useStore } from "@/store/store";
import { createOrder } from "@/actions/actions";
import { OrderSchema } from "@/schema";
import { formatCurrency } from "@/utils";

type Props = {};

const OrderSummary = (props: Props) => {
  const order = useStore((state) => state.order);
  const clearOrder = useStore((state) => state.clearOrder);
  const total = useMemo(() => {
    return order.reduce((total, item) => total + item.subtotal, 0);
  }, [order]);

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total,
      order,
    };

    const result = OrderSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await createOrder(data);

    if (response?.status === 400) {
      response.body.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    if (response?.status === 500) {
      response.body.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    toast.success("Pedido creado exitosamente");
    clearOrder();
  };

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El pedido está vacio</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
          <p className="text-2xl mt-20 text-center">
            Total a pagar: {""}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>

          <form action={handleCreateOrder} className="w-full mt-10 space-y-5">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Tu nombre"
              className="bg-white border border-gray-100 p-2 w-full"
            />
            <button
              type="submit"
              className="py-2 rounded uppercase text-white font-bold bg-black w-full text-center cursor-pointer"
            >
              Confirmar pedido
            </button>
          </form>
        </div>
      )}
      <Toaster position="top-right" richColors />
    </aside>
  );
};

export default OrderSummary;
```

### Creando las Rutas y el Layout

Dentro de `/app` vamos a crear un panel de administracion por lo cual vamos a crear una nueva carpeta llamada `admin` y dentro de esta carpeta vamos a crear un archivo llamado `layout.tsx` y otro llamado `page.tsx` dentro de `/app/admin/orders`:

```bash
mkdir app/admin
touch app/admin/page.tsx
touch app/admin/layout.tsx
```

En el archivo `layout.tsx` vamos a crear un layout para el panel de administracion:

app/admin/layout.tsx

```tsx
import { Toaster } from "sonner";
import AdminSidebar from "@/components/admin/admin-sidebar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="md:flex">
        <aside className="md:w-72 md:h-screen bg-white">
          <AdminSidebar />
        </aside>

        <main className="md:flex-1 md:h-screen md:overflow-y-scroll bg-gray-100 p-5">
          {children}
        </main>
      </div>

      <Toaster position="top-right" richColors />
    </>
  );
}
```

En el archivo `page.tsx` vamos a crear una pagina para el panel de administracion:

app/admin/orders/page.tsx

```tsx
type Props = {};

export default function AdminOrdersPage({}: Props) {
  return <div>AdminOrdersPage</div>;
}
```

### Creando un componente re-utilizable para los titulos

Creamos dentro de la carpeta `/components/ui` un archivo llamado `heading.tsx`:

/components/ui/heading.tsx

```tsx
type Props = {
  children: React.ReactNode;
};

const Heading = ({ children }: Props) => {
  return <h1 className="text-2xl my-10">{children}</h1>;
};

export default Heading;
```

### Navegacion en el panel de Administracion

Dentro de `/src/components/admin-sidebar.tsx` vamos a crear una navegacion para el panel de administracion:

```tsx
import Logo from "../icons/logo";
import AdminRoute from "./admin-route";

type Props = {};

const adminNavigation = [
  { url: "/admin/orders", text: "Ordenes", blank: false },
  { url: "/admin/products", text: "Productos", blank: false },
  { url: "/orders/cafe", text: "Ver Quiosco", blank: true },
];

const AdminSidebar = (props: Props) => {
  return (
    <>
      <Logo />
      <div className="space-y-3 ">
        <p className="mt-10 uppercase font-bold text-sm text-gray-600 text-center">
          Navegación
        </p>
        <nav className="flex flex-col">
          {adminNavigation.map((link) => (
            <AdminRoute key={link.url} link={link}></AdminRoute>
          ))}
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;
```

En `/src/components/admin-route.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  link: {
    url: string;
    text: string;
    blank: boolean;
  };
};

const AdminRoute = ({ link }: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={link.url}
      className={`font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b ${
        pathname === link.url && "bg-amber-400"
      }`}
      target={link.blank ? "_blank" : "_self"}
    >
      {link.text}
    </Link>
  );
};

export default AdminRoute;
```

### Obtener las ordenes pendientes

Dentro de `app/admin/orders/page.tsx` vamos a obtener las ordenes pendientes y mostrarlas:

```tsx
import Heading from "@/components/ui/heading";
import prismaClient from "@/libs/prisma";

type Props = {};

const getPendingOrders = async () => {
  const response = await prismaClient.order.findMany({
    where: {
      status: false,
    },
    include: {
      OrderProduct: {
        include: {
          product: true,
        },
      },
    },
  });
  return response;
};

export default async function AdminOrdersPage({}: Props) {
  const pendingOrders = await getPendingOrders();
  console.log(pendingOrders);
  return (
    <>
      <Heading>Administrador de Ordenes</Heading>
    </>
  );
}
```

### Mostrar las ordenes pendientes

En el archivo `app/admin/orders/page.tsx` vamos a mostrar las ordenes pendientes:

```tsx
import OrderCard from "@/components/order/order-card";
import Heading from "@/components/ui/heading";
import prismaClient from "@/libs/prisma";

type Props = {};

const getPendingOrders = async () => {
  const response = await prismaClient.order.findMany({
    where: {
      status: false,
    },
    include: {
      OrderProduct: {
        include: {
          product: true,
        },
      },
    },
  });
  return response;
};

export default async function AdminOrdersPage({}: Props) {
  const pendingOrders = await getPendingOrders();
  console.log(pendingOrders);
  return (
    <>
      <Heading>Administrador de Ordenes</Heading>

      {pendingOrders.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {pendingOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p>No hay ordenes pendientes</p>
      )}
    </>
  );
}
```

En el nuevo componente de `components/order/order-card.tsx` vamos a mostrar los detalles de la orden:

```tsx
import { OrderWithProducts } from "@/types";

type Props = {
  order: OrderWithProducts;
};

const OrderCard = ({ order }: Props) => {
  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
    >
      <p className="text-2xl font-medium text-gray-900">Cliente: </p>
      <p className="text-lg font-medium text-gray-900">Productos Ordenados:</p>
      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">
            Total a Pagar:
          </dt>
          <dd className="text-base font-medium text-gray-900">{}</dd>
        </div>
      </dl>

      <form>
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          value="Marcar Orden Completada"
        />
      </form>
    </section>
  );
};

export default OrderCard;
```

Vamos a generar los Types en el archivo `src/types/index.d.ts` haciendo uso de los tipos de datos de Prisma para poder tener tipado en los componentes y mostrar los datos de forma correcta:

```ts
import { Order, OrderProduct, Product } from "@prisma/client";

export type OrderItem = Pick<Product, "id" | "name" | "price"> & {
  quantity: number;
  subtotal: number;
};

export type OrderWithProducts = Order & {
  OrderProduct: (OrderProduct & {
    product: Product;
  })[];
};
```
