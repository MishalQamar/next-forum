'use server';

import prisma from '@/lib/prisma';
import { ActionState, toActionState } from '@/components/form/utils/to-action-state';

export const testDatabase = async (): Promise<ActionState> => {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Test a simple query
    const userCount = await prisma.user.count();
    
    await prisma.$disconnect();
    
    return toActionState(`Database connection successful. User count: ${userCount}`, 'SUCCESS');
  } catch (error) {
    console.error('Database test error:', error);
    return toActionState(`Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'ERROR');
  }
};
