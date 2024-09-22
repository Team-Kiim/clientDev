import axios, { AxiosError } from 'axios';
import { isEqual } from 'lodash';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { HiHashtag, HiOutlineArrowPath, HiXMark } from 'react-icons/hi2';
import ParentCategoryList from '@/Pages/user/Components/CategoryUpdate/ParentCategoryList.tsx';
import ChildCategoryList from '@/Pages/user/Components/CategoryUpdate/ChildCategoryList.tsx';
import SelectedCategoryList from '@/Pages/user/Components/CategoryUpdate/SelectedCategoryList.tsx';
import { CATEGORIES } from '@/Constants/categories.ts';
import TOAST_OPTIONS from '@/Constants/toastOptions.ts';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    isModalOpen: boolean;
    closeModal(): void;
    interestSkillCategoryList: {
        parentSkillCategory: string;
        childSkillCategory: string;
    }[];
}

interface Category {
    parentSkillCategory: string;
    childSkillCategory: string;
}

export default function CategoryUpdateModal({ isModalOpen, closeModal, interestSkillCategoryList }: Props) {
    const queryClient = useQueryClient();

    const [selectedParentCategory, setSelectedParentCategory] = useState(CATEGORIES[0].value);

    const [selectedCategories, setSelectedCategories] = useState<Category[]>(() => {
        const selectedChildCategories = interestSkillCategoryList.map(category => category.childSkillCategory);
        if (selectedChildCategories.length === 0) {
            return [];
        } else {
            const initialCategories: { parentSkillCategory: string; childSkillCategory: string }[] = [];
            for (const selectedChildCategory of selectedChildCategories) {
                for (const category of CATEGORIES) {
                    for (const childCategory of category.childCategories) {
                        if (childCategory.value === selectedChildCategory) {
                            initialCategories.push({
                                childSkillCategory: selectedChildCategory,
                                parentSkillCategory: category.value,
                            });
                        }
                    }
                }
            }
            return initialCategories;
        }
    });

    const updateSelectedCategories = (category: Category) => {
        for (const selectedCategory of selectedCategories) {
            if (isEqual(selectedCategory, category)) {
                setSelectedCategories(
                    selectedCategories.filter(selectedCategory => {
                        return !isEqual(selectedCategory, category);
                    }),
                );
                return;
            }
        }
        setSelectedCategories([...selectedCategories, category]);
    };

    const handleParentCategoryListItemClick = (parentCategory: string) => {
        setSelectedParentCategory(parentCategory);
    };

    const handleChildCategoryListItemClick = (category: Category) => {
        updateSelectedCategories(category);
    };

    const handleSelectedCategoryDeleteButtonClick = (selectedCategory: Category) => {
        updateSelectedCategories(selectedCategory);
    };

    const { mutate } = useMutation({
        mutationFn: (selectedCategories: Category[]) => {
            return axios.post('/api/member/enroll-skills', selectedCategories);
        },

        onError: (error: AxiosError) => {
            console.error(error);
            toast.error(
                <div className={'text-[0.85rem]'}>
                    관심 카테고리를 수정할 수 없습니다.
                    <br />
                    잠시 후 다시 시도해 주세요.
                </div>,
                TOAST_OPTIONS,
            );
        },

        onSettled: () => {
            return queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });

    const handleCategoryUpdateButtonClick = () => {
        mutate(selectedCategories);
        closeModal();
    };

    return (
        <Modal
            isOpen={isModalOpen}
            className={
                'fixed left-1/2 top-1/2 flex w-[32rem] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-white'
            }
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 50%)',
                    zIndex: 60,
                },
            }}
            closeTimeoutMS={280}
            onAfterOpen={() => {
                document.body.style.overflowY = 'hidden';
            }}
            onAfterClose={() => {
                document.body.style.overflowY = 'auto';
                setSelectedCategories(interestSkillCategoryList);
                setSelectedParentCategory(CATEGORIES[0].value);
            }}
        >
            <div className={'flex justify-end p-3'}>
                <button
                    className={'rounded-full p-1.5 transition-all hover:bg-slate-100'}
                    type={'button'}
                    onClick={() => {
                        closeModal();
                    }}
                >
                    <HiXMark className={'size-7'} />
                </button>
            </div>
            <div className={'flex flex-col gap-y-6'}>
                <h1 className={'px-5 text-lg font-extrabold'}>관심 카테고리 설정</h1>
                <div className={'flex flex-col gap-y-3'}>
                    <div className={'w-full border-b border-slate-200 p-2'}>
                        <ParentCategoryList
                            selectedParentCategory={selectedParentCategory}
                            onParentCategoryListItemClick={handleParentCategoryListItemClick}
                        />
                    </div>
                    <ChildCategoryList
                        selectedParentCategory={selectedParentCategory}
                        selectedCategories={selectedCategories}
                        onChildCategoryListItemClick={handleChildCategoryListItemClick}
                    />
                    <div className={'flex h-[3.25rem] w-full items-center gap-x-3 border-y border-slate-200 px-2 py-3'}>
                        <HiHashtag className={'size-6'} />
                        <SelectedCategoryList
                            selectedCategories={selectedCategories}
                            onSelectedCategoryDeleteButtonClick={handleSelectedCategoryDeleteButtonClick}
                        />
                    </div>
                </div>
                <div className={'mb-2 flex justify-between p-3'}>
                    <div className={'tooltip tooltip-bottom flex items-center justify-center'} data-tip={'초기화'}>
                        <button
                            className={'rounded-full p-1.5 transition-all hover:bg-gray-100'}
                            type={'button'}
                            onClick={() => {
                                setSelectedCategories([]);
                            }}
                        >
                            <HiOutlineArrowPath className={'size-6'} />
                        </button>
                    </div>
                    <button
                        className={
                            'rounded-lg bg-plump-purple-600 px-4 py-2.5 text-[0.9rem] font-bold text-white transition-all hover:bg-plump-purple-700 disabled:cursor-default disabled:opacity-75'
                        }
                        type={'button'}
                        onClick={handleCategoryUpdateButtonClick}
                    >
                        설정
                    </button>
                </div>
            </div>
        </Modal>
    );
}
