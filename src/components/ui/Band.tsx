import SectionWrapper from "@/components/ui/SectionWrapper";
import Seam from "@/components/ui/Seam";
import { BAND_WARM, BLUEPRINT, OCEAN_BG } from "@/lib/design";

/* Seam-framed background bands of the homepage language. Set seamBottom
   (or seamTop) false where a band touches CTABanner's border-t or another
   band's seam — stacked 1px hairlines read as a 2px line. */

interface BandProps {
  id?: string;
  children: React.ReactNode;
  sectionClassName?: string;
  seamTop?: boolean;
  seamBottom?: boolean;
}

export function WarmBand({
  id,
  children,
  sectionClassName = "relative !py-20 md:!py-28",
  seamTop = true,
  seamBottom = true,
}: BandProps) {
  return (
    <>
      {seamTop && <Seam />}
      <div className="relative" style={{ backgroundColor: BAND_WARM }}>
        <div aria-hidden className="absolute inset-0 hidden md:block" style={BLUEPRINT} />
        <SectionWrapper id={id} className={sectionClassName}>
          {children}
        </SectionWrapper>
      </div>
      {seamBottom && <Seam />}
    </>
  );
}

export function OceanBand({
  id,
  children,
  sectionClassName = "",
  seamTop = true,
  seamBottom = true,
}: BandProps) {
  return (
    <>
      {seamTop && <Seam />}
      <div style={{ background: OCEAN_BG }}>
        <SectionWrapper id={id} className={sectionClassName}>
          {children}
        </SectionWrapper>
      </div>
      {seamBottom && <Seam />}
    </>
  );
}
