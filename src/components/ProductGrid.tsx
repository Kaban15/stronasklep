'use client'

import { motion, type Variants } from 'framer-motion'
import ProductCard from './ProductCard'
import type { Produkt } from '@/lib/airtable'

interface ProductGridProps {
  products: Produkt[]
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07, // Szybka kaskada
      delayChildren: 0.05
    }
  }
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 17
    }
  }
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {products.map((produkt) => (
        <motion.div key={produkt.id} variants={itemVariants}>
          <ProductCard produkt={produkt} />
        </motion.div>
      ))}
    </motion.div>
  )
}
