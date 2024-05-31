import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { HiXMark } from 'react-icons/hi2';
import CategoryList from '@/Pages/user/Components/CategoryUpdate/CategoryList.tsx';
import { CATEGORIES } from '@/Constants/categories.ts';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Props {
    isModalOpen: boolean;
    closeModal(): void;
    interestSkillCategoryList: {
        parentSkillCategory: string;
        childSkillCategory: string;
    }[];
}

export default function CategoryUpdateModal({ isModalOpen, closeModal, interestSkillCategoryList }: Props) {
    const queryClient = useQueryClient();

    useEffect(() => {
        document.body.style.overflowX = 'hidden';
        return () => {
            document.body.style.overflowX = 'auto';
        };
    }, []);

    const [selectedParentCategory, setSelectedParentCategory] = useState(CATEGORIES[0].value);

    useEffect(() => {
        setSelectedParentCategory(CATEGORIES[0].value);
    }, [isModalOpen]);

    const [selectedCategories, setSelectedCategories] = useState<
        {
            parentSkillCategory: string;
            childSkillCategory: string;
        }[]
    >(() => {
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

    const updateSelectedCategories = (newCategory: { parentSkillCategory: string; childSkillCategory: string }) => {
        for (const category of selectedCategories) {
            if (isEqual(category, newCategory)) {
                setSelectedCategories(
                    selectedCategories.filter(category => {
                        return !isEqual(category, newCategory);
                    }),
                );
                return;
            }
        }
        setSelectedCategories([...selectedCategories, newCategory]);
    };

    const handleApplyButtonClick = async () => {
        console.log(selectedCategories);
        try {
            await axios.post('/api/member/enroll-skills', selectedCategories);
            closeModal();
            return queryClient.invalidateQueries({ queryKey: ['user'] });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            isOpen={isModalOpen}
            className={
                'fixed left-1/2 top-1/2 flex w-[32rem] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-white p-4'
            }
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 50%)',
                    zIndex: 60,
                },
            }}
            closeTimeoutMS={280}
        >
            <div className={'flex justify-end'}>
                <button
                    className={'rounded-full p-1.5 transition-all hover:bg-gray-100'}
                    type={'button'}
                    onClick={() => {
                        closeModal();
                        setSelectedCategories(interestSkillCategoryList);
                    }}
                >
                    <HiXMark className={'size-7'} />
                </button>
            </div>
            <h1 className={'mx-2 mb-3 text-[1.1rem] font-bold'}>관심 카테고리 설정</h1>
            <div className={'w-full border-b border-gray-300 p-2'}>
                <ul className={'flex w-full items-center gap-x-1 overflow-x-auto scrollbar-hide'}>
                    {CATEGORIES.map(category => {
                        return (
                            <li
                                key={category.value}
                                className={`shrink-0 cursor-pointer rounded-lg px-2.5 py-1.5 text-[0.85rem] ${category.value === selectedParentCategory ? 'bg-gray-100 font-bold' : 'bg-white font-normal'} transition-all`}
                                onClick={() => {
                                    setSelectedParentCategory(category.value);
                                }}
                            >
                                {category.label}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <CategoryList
                selectedParentCategory={selectedParentCategory}
                selectedCategories={selectedCategories}
                updateSelectedCategories={updateSelectedCategories}
            />
            <div className={'mb-1.5 flex justify-end gap-x-1'}>
                <button
                    className={'rounded-md px-3 py-1.5 text-[0.93rem] font-bold transition-all hover:bg-gray-100'}
                    type={'button'}
                    onClick={() => {
                        setSelectedCategories(interestSkillCategoryList);
                        closeModal();
                    }}
                >
                    취소
                </button>
                <button
                    className={
                        'rounded-md px-3 py-1.5 text-[0.93rem] font-bold text-violet-700 transition-all hover:bg-violet-50'
                    }
                    onClick={handleApplyButtonClick}
                >
                    설정
                </button>
            </div>
        </Modal>
    );
}
