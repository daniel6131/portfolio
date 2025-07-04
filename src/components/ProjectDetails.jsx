import { motion } from 'motion/react';
const ProjectDetails = ({ title, description, subDescription, image, tags, href, closeModal }) => {
  return (
    <div className='fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-hidden backdrop-blur-sm'>
      <motion.div
        className='from-midnight to-navy relative max-w-2xl rounded-2xl border border-white/10 bg-gradient-to-l shadow-sm'
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          className='bg-midnight absolute top-5 right-5 rounded-sm p-2 hover:bg-gray-500'
        >
          <img alt='' src='assets/close.svg' className='h-6 w-6' />
        </button>
        <img src={image} alt={title} className='w-full rounded-t-2xl' />
        <div className='p-5'>
          <h5 className='mb-2 text-2xl font-bold text-white'>{title}</h5>
          <p className='mb-3 font-normal text-neutral-400'>{description}</p>
          {subDescription.map((subDesc, index) => (
            <p key={index} className='mb-3 font-normal text-neutral-400'>
              {subDesc}
            </p>
          ))}
          <div className='mt-4 flex items-center justify-between'>
            <div className='flex gap-3'>
              {tags.map(tag => (
                <img
                  key={tag.id}
                  src={tag.path}
                  alt={tag.name}
                  className='hover-animation size-10 rounded-lg'
                />
              ))}
            </div>
            <a className='hover-animation inline-flex cursor-pointer items-center gap-1 font-medium'>
              View Project <img alt='' src='assets/arrow-up.svg' className='size-4' href={href} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
