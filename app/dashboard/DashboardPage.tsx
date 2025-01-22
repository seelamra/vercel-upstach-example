'use client';

import { Suspense } from 'react';
import Dashboard from './page';

export default function DashboardPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
        </Suspense>
    );
}
