import React, { useState } from 'react';
import { Page } from '../../types';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

interface CustomerLoginProps {
    onNavigate: (page: Page) => void;
}

export function CustomerLogin({ onNavigate }: CustomerLoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('http://localhost:3000/api/customer/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('customer_token', data.token);
                localStorage.setItem('customer_name', data.user.firstName || 'Customer');
                showToast('Welcome back!', 'success');
                onNavigate('home');
            } else {
                showToast(data.error || 'Login failed', 'error');
            }
        } catch (error) {
            showToast('Network error', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-center uppercase tracking-tight mb-8">
                    Sign In
                </h2>
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button variant="primary" size="lg" fullWidth isLoading={isLoading} type="submit">
                        Sign In
                    </Button>

                    <p className="text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={() => onNavigate('customer-signup')}
                            className="text-black font-medium hover:underline"
                        >
                            create one
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}
