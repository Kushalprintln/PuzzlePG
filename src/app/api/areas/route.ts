import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const areas = await prisma.pG.findMany({
      select: {
        area: true,
      },
      distinct: ['area'],
    })

    const areaList = areas.map((a) => a.area).filter(Boolean)

    return NextResponse.json({ areas: areaList })
  } catch (error) {
    console.error('Error fetching areas:', error)
    return NextResponse.json({ message: 'Failed to load areas' }, { status: 500 })
  }
}
