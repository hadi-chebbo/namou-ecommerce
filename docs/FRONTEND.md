# Frontend Documentation

## Frontend Tech Choices

### 1. React
React fits the application because the UI of the platform is composed of multiple reusable pieces, such as product cards, navigation, forms, cart items, and product details. The component based architecture behind React allows these pieces to be developed independantly and reused accross different pages in our website.

### 2. TypeScript
The application has several related data structures, like products their variants, users , carts , cart items , etc. So TypeScript can help define the types behind those structures to match what is being returned from the backend and to catch mistakes and type mismatches during development.

### 3. Vite
I wanted a lightweight and fast development env without unecessary configuration. Vite React setup is very straightforward which is appropriate for the scope of the assesment

### 4. Tailwind CSS
The assesment scope focused on the responsivnes of the platform accross different devices. That is why I chose tailwind because it allows responsive styling to be applied directly on the component through its className making it easy to maintain consistent design without creating several css files.

### 5. React Router
Choosen to allow navigation accross the platform and allows the protected routes to be handled centrally

### 6. TanStack Query
The application communicates with a backend API for data such as products and authentication so rather than manually managing errors, loading states, caching and refetching for every API request. TanStack Query provides a ready consisten way to manage those.

### 7. Axios
It provides a centralized API communication instead of having in each component the fetch logic for it and constructing the HTTP request themselves.

### 8. React Hook Form
The application contains forms such as authentication and eventually checkout. React Hook Form provides a structured way to manage form values, validation state, submission, and errors without manually managing every input with separate React state.

### 9. Zod
We use zod to define validation rules and keep validation close to the data structure being validated and if validation rules change in the future zod makes it easier to change them later on

## Frontend Structure

```
src/
├── components/
│   ├── auth/
│   ├── cart/
│   ├── checkout/
│   ├── layout/
│   ├── product/
│   ├── ui/
│   └── wishlist/
├── hooks/
├── lib/
├── pages/
├── schemas/
├── services/
├── types/
├── App.tsx
└── main.tsx
```
- Pages represent application screens.
- Components contain reusable UI.
- Services contain API calls.
- Hooks connect UI to application/server state.
- Types define shared frontend data structures.
- Schemas contain validation rules.
- lib contains shared infrastructure such as Axios configuration.

## State Management
I use TanStack React Query to manage server-side state such as products and the authenticated user, including caching, loading, error handling, and refetching. For simple UI state, we use React’s useState, such as controlling the mobile menu or tracking the current product page. I avoided adding a global state library because the application does not require that extra complexity.

## Authentication and Routing
Authentication is handled through the backend using an HttpOnly cookie, while the frontend uses React Query to check the current authenticated user. A ProtectedRoute prevents unauthenticated users from accessing the application and redirects them to the login page. Shared application pages are placed inside an AppLayout, which provides the common header and navigation while React Router handles navigation between the different screens.

## API Communication
We use Axios for communicating with the backend API and the API calls are kept inside seperate service files instead of having the HTTP request logic directly inside the components. The components use hooks such as useProducts which then call the related service. This keeps the components more focused on the UI and makes the API logic easier to reuse and maintain.

## Responsive Design
The application needs to work properly across different screen sizes, so the responsive design was considered while building the components and not only at the end. Tailwind responsive classes are used to adjust the layout, spacing, typography and navigation depending on the screen size. For example, the desktop header uses the full navigation while on mobile it changes to a menu drawer, and the product grid also adapts to the available screen width.

## Component Design
I tried to keep the components focused on one main responsibility and reuse them where possible instead of putting everything inside the pages. For example, AppLayout handles the main application layout, Header handles the navigation, and ProductGrid and ProductCard handle the product listing UI. This makes the pages cleaner and makes it easier to update a specific part of the interface without affecting the rest of the application.

## Extra notes
`Data consistency`: Frontend types match the data returned from the backend to keep the data consistent and catch type mismatches during development.  
  
`Mobile Consideration`: The UI was designed to work properly on smaller screens, with responsive navigation, product grids, spacing and typography while avoiding horizontal scrolling.  
  
`URL Based Navigation`: Product pages use the product slug in the URL, such as /products/leather-weekender-bag, making the URLs cleaner and easier to understand.  
  
`Product Variants`: Each variant can have its own price, image and stock, so selecting a variant updates the displayed product information accordingly.  
  