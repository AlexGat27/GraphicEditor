import { defineStore } from 'pinia';
import { modelApi } from '@/services/api/index.js';
import { BrandResponse } from '@/models/responses.js';

export const useBrandStore = defineStore('brand', {
    state: () => ({
        brands: [],
    }),
    actions: {
        fetchBrands() {
            return new Promise(async (resolve, reject) => {
                try {
                    if (this.brands.length === 0) {
                        const response = await modelApi.getBrands();
                        this.brands = response.data.map((element) => new BrandResponse(element));
                    }
                    resolve(this.brands);
                } catch (error) {
                    console.error('Ошибка при загрузке марок:', error);
                    reject(error);
                }
            });
        },
        addBrand(brand) {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await modelApi.createBrand(brand);
                    this.brands.push(new BrandResponse(response.data));
                    resolve(response.data);
                } catch (error) {
                    console.error('Ошибка при добавлении марки:', error);
                    reject(error);
                }
            });
        },
        deleteBrand(brandToDelete) {
            return new Promise(async (resolve, reject) => {
                try {
                    await modelApi.deleteBrand(brandToDelete);
                    this.brands = this.brands.filter(brand => brand.id !== brandToDelete);
                    this.selectedBrandId = null;
                    resolve();
                } catch (error) {
                    console.error('Ошибка при удалении марки:', error);
                    reject(error);
                }
            });
        },
        updateBrand(brand) {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await modelApi.updateBrand(brand.id, { name: brand.name });
                    const updatedBrand = new BrandResponse(response.data);
                    const index = this.brands.findIndex(b => b.id === brand.id);
                    this.brands.splice(index, 1, updatedBrand);
                    resolve(response.data);
                } catch (error) {
                    console.error('Ошибка при обновлении марки:', error);
                    reject(error);
                }
            });
        },
    },
});
