import { isEqual } from 'lodash';
import { useModal } from '@/Hooks/useModal.ts';
import { HiHashtag, HiOutlineMinus, HiOutlinePlus, HiXMark } from 'react-icons/hi2';
import SelectSkillCategoryModal from '@/Pages/qnas/Components/SkillCategory/SelectSkillCategoryModal.tsx';
import { CATEGORIES } from '@/Constants/categories.ts';

interface SkillCategory {
    parentSkillCategory: string;
    childSkillCategory: string;
}

interface Props {
    selectedSkillCategoryList: SkillCategory[];
    updateSelectedSkillCategoryList(newSkillCategoryList: SkillCategory[]): void;
}

export default function SkillCategorySection({ selectedSkillCategoryList, updateSelectedSkillCategoryList }: Props) {
    const { modalRef, isModalOpen, setIsModalOpen } = useModal<HTMLDivElement>({ canCloseOnOutsideClick: true });

    const childCategoryList = CATEGORIES.map(category => category.childCategories).flat();

    const handleDeleteSelectedSkillCategoryButtonClick = (skillCategoryToDelete: SkillCategory) => {
        updateSelectedSkillCategoryList(
            selectedSkillCategoryList.filter(
                selectedSkillCategory => !isEqual(skillCategoryToDelete, selectedSkillCategory),
            ),
        );
    };

    return (
        <div className={'flex w-full flex-col gap-y-2'}>
            <span className={'mx-1 w-fit text-[0.9rem] font-bold'}>카테고리</span>
            <div
                className={
                    'relative flex min-h-[44.8px] w-full items-center gap-x-2 rounded-lg border border-slate-300 px-3.5 py-2.5 transition-all'
                }
            >
                <HiHashtag />
                <div className={'flex-grow basis-0 overflow-x-auto'}>
                    {selectedSkillCategoryList.length === 0 ? (
                        <p className={'text-[0.95rem] text-slate-400'}>선택된 카테고리가 없습니다.</p>
                    ) : (
                        <ul className={'flex w-full flex-wrap gap-x-2 gap-y-1.5'}>
                            {selectedSkillCategoryList.map(selectedSkillCategory => {
                                return (
                                    <li
                                        className={
                                            'flex shrink-0 gap-x-2 rounded-xl border border-violet-300 bg-violet-50 px-2 py-0.5 text-[0.7rem] font-bold text-violet-700'
                                        }
                                    >
                                        {
                                            childCategoryList.find(
                                                childCategory =>
                                                    childCategory.value === selectedSkillCategory.childSkillCategory,
                                            ).label
                                        }
                                        <button
                                            type={'button'}
                                            onClick={() => {
                                                handleDeleteSelectedSkillCategoryButtonClick(selectedSkillCategory);
                                            }}
                                        >
                                            <HiXMark className={'size-4'} />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
                <button
                    type={'button'}
                    onClick={() => {
                        setIsModalOpen(!isModalOpen);
                    }}
                >
                    {isModalOpen ? <HiOutlineMinus className={'size-5'} /> : <HiOutlinePlus className={'size-5'} />}
                </button>
            </div>
            <div ref={modalRef}>
                {isModalOpen && (
                    <SelectSkillCategoryModal
                        closeModal={() => {
                            setIsModalOpen(false);
                        }}
                        selectedSkillCategoryList={selectedSkillCategoryList}
                        updateSelectedSkillCategoryList={updateSelectedSkillCategoryList}
                    />
                )}
            </div>
        </div>
    );
}
