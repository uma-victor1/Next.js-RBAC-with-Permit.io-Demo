import { ShoppingBag, Star, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { checkPermission } from '@/lib/permit';
import { redirect } from 'next/navigation';

export default async function Home() {
  const permitted = await checkPermission('read', 'Storefront');
  console.log(permitted, 'permittedStorefront');

  if (!permitted) {
    redirect('/dashboard/products');
  }

  const featuredItems = [
    {
      name: 'Wireless Earbuds',
      price: 79.99,
      rating: 4.5,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Electronics',
    },
    {
      name: 'Leather Jacket',
      price: 199.99,
      rating: 4.8,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Fashion',
    },
    {
      name: 'Smart Home Hub',
      price: 129.99,
      rating: 4.2,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Home & Garden',
    },
    {
      name: 'Fitness Tracker',
      price: 89.99,
      rating: 4.6,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Sports',
    },
    {
      name: 'Organic Face Cream',
      price: 24.99,
      rating: 4.7,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Beauty',
    },
    {
      name: 'Bestseller Novel',
      price: 14.99,
      rating: 4.9,
      image: '/placeholder.svg?height=200&width=200',
      category: 'Books',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full bg-black py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Discover Amazing Stores on ShopHub
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Explore a wide range of unique stores and find exactly what
                  you&apos;re looking for.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-white text-black hover:bg-gray-200">
                  Explore Stores
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-black hover:bg-white hover:text-black"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
              Featured Stores
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredItems.map((item) => (
                <Card key={item.name} className="overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={400}
                      height={200}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-lg font-bold">
                          ${item.price.toFixed(2)}
                        </span>
                        <div className="flex items-center">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm text-gray-600">
                            {item.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Button className="w-full">Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button variant="outline" className="text-lg">
                View All Stores
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Join ShopHub as a Seller
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Expand your reach and grow your business with our platform.
                  Benefit from our large customer base and easy-to-use seller
                  tools.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    prefetch={true}
                    className="rounded-md border px-4 py-1.5 text-sm font-medium transition-colors hover:border-white hover:bg-white hover:text-black"
                    href="/login"
                  >
                    Login
                  </Link>
                  <Link
                    prefetch={true}
                    className="rounded-md border px-4 py-1.5 text-sm font-medium transition-colors hover:border-black hover:bg-black hover:text-white"
                    href="/signup"
                  >
                    SignUp
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Seller dashboard preview"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500">
          © 2023 ShopHub Inc. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
