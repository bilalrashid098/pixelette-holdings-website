'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Orbit.module.css';

/**
 * The homepage hero widget: four capability nodes around a rotating pair of
 * rings.
 *
 * It is CONTENT, not decoration — each node carries its own copy and the whole
 * thing has an aria-label describing it — so it stays, and the widget matrix
 * never came into play for this conversion. The markup below is the homepage's
 * previous markup unchanged in structure, order and wording; only the class
 * names and the stylesheet they resolve to have moved.
 *
 * The rotation is a SANCTIONED MOTION EXCEPTION, requested explicitly by the
 * user. See Orbit.module.css for the seven conditions an exception has to meet
 * and where each one is met. Do not read this as decoration a previous pass
 * forgot to remove.
 *
 * This component exists for exactly one reason beyond holding the markup: a CSS
 * animation runs forever, including on a hero that has been scrolled past, so
 * an IntersectionObserver pauses it off-screen. That is the whole job. It is
 * deliberately the only piece of client state the hero has, and it replaces the
 * ScrollEffects component deleted at D2 in the client-directive count.
 */
export function Orbit() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Single target, so the first entry is the only entry.
        const entry = entries[0];
        if (entry) setVisible(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={visible ? styles.orbit : `${styles.orbit} ${styles.paused}`}
      role="img"
      aria-label="Four integrated Pixelette capabilities: Build, Grow, Ready and Align"
    >
      <div className={styles.ring} />
      <div className={`${styles.ring} ${styles.ringTwo}`} />
      <div className={styles.core}>
        <div>
          <strong>HSE</strong>
          <span>Execution engine</span>
        </div>
      </div>
      <div className={`${styles.node} ${styles.nodeBuild}`}><span>01 · Build</span><strong>Technology</strong></div>
      <div className={`${styles.node} ${styles.nodeLaunch}`}><span>02 · Grow</span><strong>Marketing</strong></div>
      <div className={`${styles.node} ${styles.nodeAssure}`}><span>03 · Ready</span><strong>Certified</strong></div>
      <div className={`${styles.node} ${styles.nodeOwn}`}><span>04 · Align</span><strong>Holdings</strong></div>
    </div>
  );
}
