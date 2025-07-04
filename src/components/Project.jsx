import { useState, useCallback } from 'react';
import ProjectDetails from './ProjectDetails';

const SEPARATOR_STYLES =
  'h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent';

const Project = ({ title, description, subDescription, href, image, tags, setPreview }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setPreview(image);
  }, [image, setPreview]);

  const handleMouseLeave = useCallback(() => {
    setPreview(null);
  }, [setPreview]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div
        className='flex-wrap items-center justify-between space-y-14 py-10 sm:flex sm:space-y-0'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role='presentation'
      >
        <div>
          <p className='text-2xl'>{title}</p>
          <div className='text-sand mt-2 flex gap-5'>
            {tags.map(tag => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
        </div>
        <button
          onClick={openModal}
          className='hover-animation flex cursor-pointer items-center gap-1'
          aria-label={`Read more about ${title}`}
        >
          Read More
          <img alt='' src='assets/arrow-right.svg' className='w-5' />
        </button>
      </div>
      <div className={SEPARATOR_STYLES} />
      {isModalOpen && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default Project;
