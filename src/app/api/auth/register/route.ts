import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, password } = body

  if (!email || !password || !name) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 })
  }

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword }
  })

  return NextResponse.json({ message: 'User registered', userId: user.id }, { status: 201 })
}

