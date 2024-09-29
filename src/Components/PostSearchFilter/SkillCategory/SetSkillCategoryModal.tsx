import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Modal from 'react-modal';
import { HiOutlineArrowPath, HiXMark } from 'react-icons/hi2';
import ParentSkillCategoryList from '@/Components/PostSearchFilter/SkillCategory/ParentSkillCategoryList.tsx';
import ChildSkillCategoryList from '@/Components/PostSearchFilter/SkillCategory/ChildSkillCategoryList.tsx';
import { CATEGORIES } from '@/Constants/categories.ts';
import type { SkillCategory } from '@/Types/skillCategory.ts';

interface Props {
    isModalOpen: boolean;
    closeModal(): void;
}

export default function SetSkillCategoryModal({ isModalOpen, closeModal }: Props) {
    const [selectedParentSkillCategory, setSelectedParentSkillCategory] = useState(CATEGORIES[0].value);

    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedSkillCategories, setSelectedSkillCategories] = useState<SkillCategory[]>(() => {
        const selectedChildSkillCategories = searchParams.getAll('category');

        if (selectedChildSkillCategories.length === 0) {
            return;
        }

        const initialSkillCategories: SkillCategory[] = [];

        for (const selectedChildSkillCategory of selectedChildSkillCategories) {
            for (const skillCategory of CATEGORIES) {
                for (const childSkillCategory of skillCategory.childCategories) {
                    if (childSkillCategory.value === selectedChildSkillCategory) {
                        initialSkillCategories.push({
                            childSkillCategory: selectedChildSkillCategory,
                            parentSkillCategory: skillCategory.value,
                        });
                    }
                }
            }
        }

        return initialSkillCategories;
    });

    useEffect(() => {
        const selectedChildSkillCategories = searchParams.getAll('category');

        if (selectedChildSkillCategories.length === 0) {
            setSelectedSkillCategories([]);
            return;
        }

        const initialSkillCategories: SkillCategory[] = [];

        for (const selectedChildSkillCategory of selectedChildSkillCategories) {
            for (const skillCategory of CATEGORIES) {
                for (const childSkillCategory of skillCategory.childCategories) {
                    if (childSkillCategory.value === selectedChildSkillCategory) {
                        initialSkillCategories.push({
                            childSkillCategory: selectedChildSkillCategory,
                            parentSkillCategory: skillCategory.value,
                        });
                    }
                }
            }
        }

        setSelectedSkillCategories(initialSkillCategories);
    }, [searchParams]);

    const handleParentSkillCategoryButtonClick = (parentSkillCategory: string) => {
        if (parentSkillCategory !== selectedParentSkillCategory) {
            setSelectedParentSkillCategory(parentSkillCategory);
        }
    };

    const handleChildSkillCategoryButtonClick = (skillCategory: SkillCategory) => {
        for (const selectedSkillCategory of selectedSkillCategories) {
            if (isEqual(selectedSkillCategory, skillCategory)) {
                setSelectedSkillCategories(
                    selectedSkillCategories.filter(
                        selectedSkillCategory => !isEqual(selectedSkillCategory, skillCategory),
                    ),
                );
                return;
            }
        }
        setSelectedSkillCategories([...selectedSkillCategories, skillCategory]);
    };

    const handleApplyButtonClick = () => {
        searchParams.delete('category');
        if (selectedSkillCategories.length !== 0) {
            for (const selectedSkillCategory of selectedSkillCategories) {
                searchParams.append('category', selectedSkillCategory.childSkillCategory);
            }
        }
        setSearchParams(searchParams);
        closeModal();
    };

    const handleResetButtonClick = () => {
        if (selectedSkillCategories.length !== 0) {
            searchParams.delete('category');
            setSearchParams(searchParams);
            closeModal();
        }
    };

    return (
        <Modal
            isOpen={isModalOpen}
            className={
                'fixed left-1/2 top-1/2 flex w-[45rem] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-white focus:outline-none'
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
            }}
        >
            <div className={'flex justify-end p-3'}>
                <button
                    className={'rounded-full p-1.5 transition-all hover:bg-gray-100'}
                    type={'button'}
                    onClick={() => {
                        closeModal();
                    }}
                >
                    <HiXMark className={'size-7'} />
                </button>
            </div>
            <div className={'flex flex-col gap-y-10'}>
                <div className={'flex flex-col gap-y-6'}>
                    <h2 className={'px-5 text-lg font-extrabold'}>카테고리 설정</h2>
                    <div className={'flex flex-col gap-y-3.5'}>
                        <ParentSkillCategoryList
                            selectedParentSkillCategory={selectedParentSkillCategory}
                            onParentSkillCategoryButtonClick={handleParentSkillCategoryButtonClick}
                        />
                        <hr />
                        <ChildSkillCategoryList
                            selectedParentSkillCategory={selectedParentSkillCategory}
                            selectedSkillCategories={selectedSkillCategories}
                            onChildSkillCategoryButtonClick={handleChildSkillCategoryButtonClick}
                        />
                    </div>
                </div>
                <div className={'flex items-center justify-between p-3'}>
                    <div className={'tooltip tooltip-bottom'} data-tip={'초기화'}>
                        <button
                            className={'rounded-full p-1.5 transition-all hover:bg-gray-100'}
                            type={'button'}
                            onClick={handleResetButtonClick}
                        >
                            <HiOutlineArrowPath className={'size-6'} />
                        </button>
                    </div>
                    <button
                        className={
                            'rounded-xl bg-plump-purple-600 px-5 py-2 text-white transition-all hover:bg-plump-purple-700'
                        }
                        type={'button'}
                        onClick={handleApplyButtonClick}
                    >
                        <span className={'text-[0.85rem] font-bold'}>적용</span>
                    </button>
                </div>
            </div>
        </Modal>
    );
}
