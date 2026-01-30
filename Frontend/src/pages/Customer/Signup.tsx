import React, { useState } from 'react';
import { Page } from '../../types';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

interface CustomerSignupProps {
    onNavigate: (page: Page) => void;
}

export function CustomerSignup({ onNavigate }: CustomerSignupProps) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('http://localhost:3000/api/customer/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('customer_token', data.token);
                localStorage.setItem('customer_name', data.user.firstName);
                showToast('Account created successfully', 'success');
                onNavigate('home');
            } else {
                showToast(data.error || 'Signup failed', 'error');
            }
        } catch (error) {
            showToast('Network error', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-center uppercase tracking-tight mb-8">
                    Create Account
                </h2>
                <form className="space-y-6" onSubmit={handleSignup}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">First Name</label>
                            <input
                                name="firstName"
                                required
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Last Name</label>
                            <input
                                name="lastName"
                                required
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <Button variant="primary" size="lg" fullWidth isLoading={isLoading} type="submit">
                        Sign Up
                    </Button>

                    <p className="text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={() => onNavigate('customer-login')}
                            className="text-black font-medium hover:underline"
                        >
                            Sign in
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}
