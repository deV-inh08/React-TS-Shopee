import React, {useState, useRef, useId, ElementType} from 'react'
import { useFloating , FloatingPortal, arrow} from '@floating-ui/react'
import { motion, AnimatePresence} from "framer-motion"


interface Props {
    children: React.ReactNode
    renderPopover: React.ReactNode
    className ?: string
    as ?: ElementType
}

const Popover = ({children, className, renderPopover, as: Element="div"}: Props) => {
    const id = useId()
    const [open, setOpen] = useState(false);
    const arrowRef = useRef<HTMLElement>(null);
    const {x, y, refs, strategy, middlewareData} = useFloating({
        open,
        onOpenChange: setOpen,
        middleware: [arrow({element : arrowRef})]
    });

    const showPopover = () => {
        setOpen(true)
    };

    const hidePopover = () => {
        setOpen(false)
    };
  return (
            <Element className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                    <span className='mx-1'>Tiếng Việt</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg> */}
                    {children}
                    <FloatingPortal id={id}>
                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    ref={refs.setFloating}
                                    style={{
                                        position: strategy,
                                        top: y ?? 0,
                                        left: x ?? 0,
                                    }}
                                    initial= {{opacity: 0, transform: "scale(0)"}}
                                    animate={{opacity: 1, transform: "scale(1)"}}
                                    exit={{opacity: 0, transform: "scale(0)"}}
                                    transition={{duration: 0.25}}
                                >
                                    <span ref={arrowRef} className='border-x-transparent border-t-transparent border-b-white border-[11px] absolute z-1 -translate-y-[99%]' style={{
                                        left: middlewareData.arrow?.x ?? "auto",
                                        top: middlewareData.arrow?.y ?? "auto"
                                    }}></span>
                                    {/* <div className='bg-white relative shadow-sm rounded-sm border border-gray-200 pt-2'>
                                        <div className='flex flex-col py-2 px-3'>
                                            <button className='py-2 px-3 hover:text-orange'>Tieng Viet</button>
                                        </div>
                                        <div className='flex flex-col py-2 px-3'>
                                            <button className='py-2 px-3 hover:text-orange'>Tieng Anh</button>
                                        </div>
                                    </div> */}
                                    {renderPopover}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </FloatingPortal>
            </Element>
  )
}

export default Popover;