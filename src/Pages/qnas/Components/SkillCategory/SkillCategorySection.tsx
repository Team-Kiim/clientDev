import { isEqual } from 'lodash';
import { useModal } from '@/Hooks/useModal.ts';
import { HiOutlineMinus, HiOutlinePlus, HiXMark } from 'react-icons/hi2';
import { VscSettings } from 'react-icons/vsc';
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
            <span className={'mx-1 w-fit text-[0.9rem] font-bold'}>
                카테고리
                <span className={'text-rose-500'}>﹡</span>
            </span>
            <div
                className={
                    'relative flex w-full items-center gap-x-2 rounded-lg border border-slate-300 px-3.5 transition-all'
                }
            >
                <VscSettings className={'size-6 text-plump-purple-600'} />
                <div className={'flex h-11 min-w-0 flex-1 items-center'}>
                    {selectedSkillCategoryList.length === 0 ? (
                        <p className={'text-[0.8rem] text-slate-400'}>선택된 카테고리가 없습니다.</p>
                    ) : (
                        <ul
                            className={
                                'flex h-full w-full flex-wrap justify-start gap-x-2 gap-y-1.5 overflow-y-auto py-1.5 scrollbar-hide'
                            }
                        >
                            {selectedSkillCategoryList.map(selectedSkillCategory => {
                                return (
                                    <li
                                        className={
                                            'flex shrink-0 gap-x-2 rounded-lg border border-violet-300 bg-plump-purple-50 px-3 py-1.5 text-[0.75rem] font-bold text-plump-purple-600'
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
            <div ref={modalRef} className={'relative'}>
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
