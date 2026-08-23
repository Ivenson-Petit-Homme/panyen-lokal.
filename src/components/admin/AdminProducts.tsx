import React, { useEffect, useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Box,
  Tag,
  X,
  Save,
  Check,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';
import { UserAccount, ProductCategory } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

interface AdminProductsProps {
  currentUser: UserAccount | null;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({ currentUser }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    slug: '',
    category: 'Huiles & Soins Naturels' as ProductCategory,
    shortDescription: '',
    description: '',
    image: '',
    origin: '',
    terroirLocation: '',
    badge: '',
    isFeatured: false,
    inStock: true,
    highlights: [] as string[],
    ingredients: [] as string[]
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'x-user-id': currentUser?.id || '' },
        body: uploadData
      });
      const data = await res.json();
      if (data.success) {
        setFormData({ ...formData, image: data.url });
      } else {
        alert(data.message || 'Erreur lors de l\'upload');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur réseau lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products', {
        headers: { 'x-user-id': currentUser?.id || '' }
      });
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentUser]);

  const handleOpenModal = (product: any = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        id: product.id,
        title: product.title,
        slug: product.slug,
        category: product.category,
        shortDescription: product.short_description || product.shortDescription,
        description: product.description,
        image: product.image_url || product.image,
        origin: product.origin,
        terroirLocation: product.terroir_location || product.terroirLocation,
        badge: product.badge,
        isFeatured: !!product.is_featured,
        inStock: !!product.in_stock,
        highlights: product.highlights || [],
        ingredients: product.ingredients || []
      });
    } else {
      setEditingProduct(null);
      setFormData({
        id: '',
        title: '',
        slug: '',
        category: 'Huiles & Soins Naturels',
        shortDescription: '',
        description: '',
        image: '',
        origin: 'Haïti',
        terroirLocation: '',
        badge: '',
        isFeatured: false,
        inStock: true,
        highlights: [],
        ingredients: []
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce produit ?')) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { 'x-user-id': currentUser?.id || '' }
      });
      if (res.ok) fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingProduct ? 'PUT' : 'POST';
    const url = editingProduct ? `/api/admin/products/${editingProduct.id}` : '/api/admin/products';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': currentUser?.id || ''
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="py-20 text-center font-bold text-stone-400 animate-pulse uppercase tracking-widest">Initialisation du catalogue...</div>;

  return (
    <div className="space-y-6 animate-fadeIn pb-20">
      <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-stone-200 shadow-xs">
        <div>
          <h3 className="text-lg font-black text-stone-800 uppercase">Catalogue Produits</h3>
          <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">{products.length} Atik nan baz la</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1B4332] hover:bg-[#235841] text-[#E9C46A] rounded-xl text-xs font-black shadow-lg cursor-pointer transition-all border border-[#E9C46A]/30"
        >
          <Plus className="w-4 h-4" />
          AJOUTE PWODWI
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            layout
            key={product.id}
            className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300"
          >
            <div className="h-48 bg-stone-100 relative overflow-hidden">
              <img
                src={product.image_url || product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase shadow-sm border ${
                  product.in_stock ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-red-500 text-white border-red-400'
                }`}>
                  {product.in_stock ? 'DISPONIBLE' : 'RUPTURE'}
                </span>
                {product.is_featured === 1 && (
                  <span className="bg-[#E9C46A] text-[#1B4332] px-2.5 py-1 rounded-lg text-[9px] font-black uppercase shadow-sm">Featured</span>
                )}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black text-[#1B4332] bg-[#1B4332]/10 px-2 py-0.5 rounded uppercase tracking-widest">{product.category}</span>
                </div>
                <h4 className="font-black text-stone-900 leading-tight text-lg">{product.title}</h4>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {product.short_description || product.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenModal(product)}
                    className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-xs"
                    title="Modifier"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer shadow-xs"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-stone-400 block uppercase">ID: {product.id}</span>
                  <span className="text-[10px] font-black text-[#1B4332]">{product.origin}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CREATE/EDIT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200"
            >
              <div className="p-6 border-b border-stone-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h3 className="text-xl font-black text-[#1B4332] uppercase">
                  {editingProduct ? 'Modifier le Produit' : 'Nouvel Article'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-stone-100 rounded-full cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-stone-500">ID Unique (ex: huile-ricin)</label>
                    <input
                      type="text"
                      required
                      disabled={!!editingProduct}
                      value={formData.id}
                      onChange={(e) => setFormData({...formData, id: e.target.value})}
                      className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-2 focus:ring-[#2E7D32] disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-stone-500">Slug (URL)</label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-2 focus:ring-[#2E7D32]"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-stone-500">Nom du Produit</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs font-bold focus:ring-2 focus:ring-[#2E7D32]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-stone-500">Catégorie</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                      className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-2 focus:ring-[#2E7D32]"
                    >
                      <option value="Huiles & Soins Naturels">Huiles & Soins Naturels</option>
                      <option value="Boissons & Liqueurs">Boissons & Liqueurs</option>
                      <option value="Épicerie & Alimentaire">Épicerie & Alimentaire</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-stone-500">Image du Produit</label>
                    <div className="flex items-center gap-4">
                      {formData.image && (
                        <div className="w-16 h-16 rounded-xl border border-stone-200 overflow-hidden bg-stone-100 shrink-0">
                          <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 relative">
                        <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-dashed border-stone-200 rounded-xl cursor-pointer hover:bg-stone-50 transition-all">
                          <div className="flex items-center gap-2 text-stone-500">
                            {uploading ? (
                              <div className="w-4 h-4 border-2 border-[#1B4332] border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <ImageIcon className="w-4 h-4" />
                            )}
                            <span className="text-[10px] font-bold uppercase">{uploading ? 'Téléchargement...' : 'Choisir une image'}</span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-stone-500">Description Courte</label>
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-stone-500">Description Complète</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                      className="w-4 h-4 accent-[#2E7D32]"
                    />
                    <span className="text-[10px] font-black uppercase">En Stock</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                      className="w-4 h-4 accent-[#2E7D32]"
                    />
                    <span className="text-[10px] font-black uppercase">Featured</span>
                  </label>
                </div>

                <div className="pt-6 border-t border-stone-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 rounded-xl text-xs font-bold text-stone-500 hover:bg-stone-100 cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-black text-xs shadow-lg flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <Save className="w-4 h-4" />
                    ENREGISTRER
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
