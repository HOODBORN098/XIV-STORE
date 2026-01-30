import React, { useState } from 'react';
import { Page } from '../../types';
import { Button } from '../../components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface AddProductProps {
    onNavigate: (page: Page) => void;
}

export function AddProduct({ onNavigate }: AddProductProps) {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        imageUrl: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('admin_token');

        try {
            const res = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock)
                })
            });

            if (res.ok) {
                showToast('Product added successfully', 'success');
                onNavigate('admin-dashboard');
            } else {
                const err = await res.json();
                showToast(JSON.stringify(err.error), 'error');
            }
        } catch (error) {
            showToast('Failed to add product', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <button
                onClick={() => onNavigate('admin-dashboard')}
                className="flex items-center text-sm text-gray-500 hover:text-black mb-8"
            >
                <ArrowLeft size={16} className="mr-2" /> Back
            </button>

            <h1 className="text-3xl font-bold uppercase tracking-tight mb-8">Add New Product</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 uppercase mb-2">Name</label>
                    <input
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 focus:border-black focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 uppercase mb-2">Description</label>
                    <textarea
                        name="description"
                        required
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 focus:border-black focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 uppercase mb-2">Price ($)</label>
                        <input
                            name="price"
                            type="number"
                            step="0.01"
                            required
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 focus:border-black focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 uppercase mb-2">Stock</label>
                        <input
                            name="stock"
                            type="number"
                            required
                            value={formData.stock}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 focus:border-black focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 uppercase mb-2">Category</label>
                    <input
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 focus:border-black focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 uppercase mb-2">Image URL</label>
                    <input
                        name="imageUrl"
                        required
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="https://..."
                        className="w-full border border-gray-300 p-3 focus:border-black focus:outline-none"
                    />
                </div>

                <Button type="submit" variant="primary" size="lg" fullWidth isLoading={loading}>
                    Create Product
                </Button>
            </form>
        </div>
    );
}
