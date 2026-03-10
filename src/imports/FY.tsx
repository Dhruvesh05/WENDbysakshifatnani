import svgPaths from "./svg-x7swsbypsk";
import imgImageModernInteriorDesign from "@/assets/placeholder.svg";
import imgImageMinimalistLivingRoom from "@/assets/placeholder.svg";
import imgImageContemporaryBedroom from "@/assets/placeholder.svg";
import imgImageLuxuryKitchen from "@/assets/placeholder.svg";
import imgImageModernDiningRoom from "@/assets/placeholder.svg";
import imgImageStylishBathroom from "@/assets/placeholder.svg";
import imgImage2 from "@/assets/placeholder.svg";

function Heading() {
  return <div className="absolute h-[144px] left-0 top-0 w-[533.6px]" data-name="Heading 1" />;
}

function Link() {
  return (
    <div className="absolute bg-[#072c3c] h-[56px] left-0 top-0 w-[185.688px]" data-name="Link">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[32px] text-[16px] text-white top-[13.8px]">Start Your Project</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[56px] left-0 top-[256px] w-[533.6px]" data-name="Paragraph">
      <Link />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[312px] left-0 top-[94px] w-[533.6px]" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function ImageModernInteriorDesign() {
  return (
    <div className="absolute h-[500px] left-[581.6px] top-0 w-[533.6px]" data-name="Image (Modern interior design)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageModernInteriorDesign} />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute h-[500px] left-[32px] top-[160px] w-[1115.2px]" data-name="Section">
      <Container />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal h-[196px] leading-[72px] left-0 text-[#0a0a0a] text-[72px] top-[14px] w-[534px] whitespace-pre-wrap">Designing Spaces and Exploring Materials</p>
      <ImageModernInteriorDesign />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[48px] left-[558.15px] text-[#072c3c] text-[48px] text-center top-[-5px]">Portfolio</p>
    </div>
  );
}

function Paragraph1() {
  return <div className="h-[28px] shrink-0 w-full" data-name="Paragraph" />;
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[92px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Paragraph1 />
    </div>
  );
}

function ImageModernLivingSpace() {
  return (
    <div className="h-[320px] relative shrink-0 w-full" data-name="Image (Modern Living Space)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageModernInteriorDesign} />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#e5e7eb] content-stretch flex flex-col h-[320px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageModernLivingSpace />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[#0a0a0a] text-[20px] top-[-2.2px]">Modern Living Space</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] top-[-2.2px]">Residential</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[392px] items-start left-0 top-0 w-[350.4px]" data-name="Container">
      <Container4 />
      <Heading2 />
      <Paragraph2 />
    </div>
  );
}

function ImageMinimalistLivingRoom() {
  return (
    <div className="h-[320px] relative shrink-0 w-full" data-name="Image (Minimalist Living Room)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageMinimalistLivingRoom} />
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#e5e7eb] content-stretch flex flex-col h-[320px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageMinimalistLivingRoom />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[#0a0a0a] text-[20px] top-[-2.2px]">Minimalist Living Room</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] top-[-2.2px]">Residential</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[392px] items-start left-[382.4px] top-0 w-[350.4px]" data-name="Container">
      <Container6 />
      <Heading3 />
      <Paragraph3 />
    </div>
  );
}

function ImageContemporaryBedroom() {
  return (
    <div className="h-[320px] relative shrink-0 w-full" data-name="Image (Contemporary Bedroom)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageContemporaryBedroom} />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#e5e7eb] content-stretch flex flex-col h-[320px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageContemporaryBedroom />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[#0a0a0a] text-[20px] top-[-2.2px]">Contemporary Bedroom</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] top-[-2.2px]">Residential</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[392px] items-start left-[764.8px] top-0 w-[350.4px]" data-name="Container">
      <Container8 />
      <Heading4 />
      <Paragraph4 />
    </div>
  );
}

function ImageLuxuryKitchen() {
  return (
    <div className="h-[320px] relative shrink-0 w-full" data-name="Image (Luxury Kitchen)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageLuxuryKitchen} />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#e5e7eb] content-stretch flex flex-col h-[320px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageLuxuryKitchen />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[#0a0a0a] text-[20px] top-[-2.2px]">Luxury Kitchen</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] top-[-2.2px]">Residential</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[392px] items-start left-0 top-[424px] w-[350.4px]" data-name="Container">
      <Container10 />
      <Heading5 />
      <Paragraph5 />
    </div>
  );
}

function ImageModernDiningRoom() {
  return (
    <div className="h-[320px] relative shrink-0 w-full" data-name="Image (Modern Dining Room)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageModernDiningRoom} />
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[#e5e7eb] content-stretch flex flex-col h-[320px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageModernDiningRoom />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[#0a0a0a] text-[20px] top-[-2.2px]">Modern Dining Room</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] top-[-2.2px]">Residential</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[392px] items-start left-[382.4px] top-[424px] w-[350.4px]" data-name="Container">
      <Container12 />
      <Heading6 />
      <Paragraph6 />
    </div>
  );
}

function ImageStylishBathroom() {
  return (
    <div className="h-[320px] relative shrink-0 w-full" data-name="Image (Stylish Bathroom)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageStylishBathroom} />
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[#e5e7eb] content-stretch flex flex-col h-[320px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageStylishBathroom />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[#0a0a0a] text-[20px] top-[-2.2px]">Stylish Bathroom</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] top-[-2.2px]">Residential</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[392px] items-start left-[764.8px] top-[424px] w-[350.4px]" data-name="Container">
      <Container14 />
      <Heading7 />
      <Paragraph7 />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[816px] relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container5 />
      <Container7 />
      <Container9 />
      <Container11 />
      <Container13 />
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col gap-[64px] h-[972px] items-start left-0 px-[32px] top-[812px] w-[1179.2px]" data-name="Section">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[48px] left-[557.73px] text-[#0a0a0a] text-[48px] text-center top-[-5px]">Services</p>
    </div>
  );
}

function Paragraph8() {
  return <div className="h-[28px] shrink-0 w-full" data-name="Paragraph" />;
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[92px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading8 />
      <Paragraph8 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[63.975px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[32px] left-0 text-[#0a0a0a] text-[24px] top-[-2px] w-[119px] whitespace-pre-wrap">Residential Design</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col h-[239.975px] items-start left-0 pt-[32px] px-[32px] top-0 w-[254.8px]" data-name="Container">
      <Heading9 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[63.975px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[32px] left-0 text-[#0a0a0a] text-[24px] top-[-2px] w-[130px] whitespace-pre-wrap">Commercial Spaces</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col h-[239.975px] items-start left-[286.8px] pt-[32px] px-[32px] top-0 w-[254.8px]" data-name="Container">
      <Heading10 />
    </div>
  );
}

function Heading11() {
  return (
    <div className="content-stretch flex h-[31.988px] items-start relative shrink-0 w-full" data-name="Heading 3">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[32px] min-h-px min-w-px relative text-[#0a0a0a] text-[24px] whitespace-pre-wrap">Space Planning</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col h-[239.975px] items-start left-[573.6px] pt-[32px] px-[32px] top-0 w-[254.8px]" data-name="Container">
      <Heading11 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="h-[63.975px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[32px] left-0 text-[#0a0a0a] text-[24px] top-[-2px] w-[139px] whitespace-pre-wrap">{`Styling & Consultation`}</p>
    </div>
  );
}

function Paragraph9() {
  return <div className="h-[96px] shrink-0 w-full" data-name="Paragraph" />;
}

function Container20() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col gap-[16px] h-[239.975px] items-start left-[860.4px] pt-[32px] px-[32px] top-0 w-[254.8px]" data-name="Container">
      <Heading12 />
      <Paragraph9 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[239.975px] relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container18 />
      <Container19 />
      <Container20 />
    </div>
  );
}

function Section2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[64px] h-[395.975px] items-start left-0 px-[32px] top-[1952px] w-[1179.2px]" data-name="Section">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Heading13() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[48px] left-0 text-[#0a0a0a] text-[48px] top-[-5px]">About Us</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[84px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[#4a5565] text-[20px] top-[-2.2px] w-[520px] whitespace-pre-wrap">Our approach combines timeless design principles with contemporary aesthetics, ensuring every project stands the test of time while remaining relevant and inspiring.</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[#4a5565] text-[20px] top-[-2.2px] w-[530px] whitespace-pre-wrap">{`From concept to completion, we're committed to excellence in every detail.`}</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[344px] items-start left-[581.6px] top-[78px] w-[533.6px]" data-name="Container">
      <Heading13 />
      <Paragraph10 />
      <Paragraph11 />
    </div>
  );
}

function ImageMinimalistLivingRoom1() {
  return (
    <div className="absolute h-[500px] left-0 top-0 w-[533.6px]" data-name="Image (Minimalist living room)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageMinimalistLivingRoom} />
    </div>
  );
}

function Section3() {
  return (
    <div className="absolute bg-[#f9fafb] h-[500px] left-[32px] top-[2507.98px] w-[1115.2px]" data-name="Section">
      <Container21 />
      <ImageMinimalistLivingRoom1 />
    </div>
  );
}

function Heading14() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[48px] left-[557.79px] text-[#0a0a0a] text-[48px] text-center top-[-5px]">Get In Touch</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-[557.77px] text-[#4a5565] text-[20px] text-center top-[-2.2px]">{`Let's create something beautiful together`}</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[92px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading14 />
      <Paragraph12 />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-0 size-[24px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p9c60400} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2bf8f980} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Heading15() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[#0a0a0a] text-[20px] top-[-2.2px]">Email</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] top-[-2.2px]">wendbysakshifatnani@gmail.com</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[60px] items-start left-[40px] top-0 w-[181.875px]" data-name="Container">
      <Heading15 />
      <Paragraph13 />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Icon />
      <Container26 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-0 size-[24px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3a2d4980} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Heading16() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[#0a0a0a] text-[20px] top-[-2.2px]">Phone</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#4a5565] text-[16px] top-[-2.2px]">+91 8767-915-715</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[60px] items-start left-[40px] top-0 w-[130.65px]" data-name="Container">
      <Heading16 />
      <Paragraph14 />
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <Icon1 />
      <Container28 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-0 size-[24px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p27c543b0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2d59bff0} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Heading17() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[#0a0a0a] text-[20px] top-[-2.2px]">Cloud Office</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="font-['Arimo:Regular',sans-serif] font-normal h-[48px] leading-[24px] relative shrink-0 text-[#4a5565] text-[16px] w-full" data-name="Paragraph">
      <p className="absolute left-0 top-[-2.2px]">Malegaon, Nashik</p>
      <p className="absolute left-0 top-[21.8px]">Maharashtra- 423203</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[84px] items-start left-[40px] top-0 w-[142.788px]" data-name="Container">
      <Heading17 />
      <Paragraph15 />
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[84px] relative shrink-0 w-full" data-name="Container">
      <Icon2 />
      <Container30 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[486.4px] items-start left-0 top-0 w-[533.6px]" data-name="Container">
      <Container25 />
      <Container27 />
      <Container29 />
    </div>
  );
}

function Label() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#0a0a0a] text-[14px] top-[-1.2px]">Name</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="h-[49.6px] relative shrink-0 w-full" data-name="Text Input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[0.8px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[77.6px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <TextInput />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#0a0a0a] text-[14px] top-[-1.2px]">Email</p>
    </div>
  );
}

function EmailInput() {
  return (
    <div className="h-[49.6px] relative shrink-0 w-full" data-name="Email Input">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[0.8px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[77.6px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <EmailInput />
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#0a0a0a] text-[14px] top-[-1.2px]">Message</p>
    </div>
  );
}

function TextArea() {
  return (
    <div className="h-[169.6px] relative shrink-0 w-full" data-name="Text Area">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[0.8px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[203.2px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <TextArea />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#072c3c] h-[56px] relative shrink-0 w-full" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[267.31px] text-[16px] text-center text-white top-[13.8px]">Send Message</p>
    </div>
  );
}

function Form() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[486.4px] items-start left-[581.6px] top-0 w-[533.6px]" data-name="Form">
      <Container31 />
      <Container32 />
      <Container33 />
      <Button />
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[486.4px] relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Form />
    </div>
  );
}

function Section4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[64px] h-[642.4px] items-start left-0 px-[32px] top-[3167.98px] w-[1179.2px]" data-name="Section">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[20px] text-white top-[-2.2px] tracking-[1px]">WEND</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[28px] relative shrink-0 w-[226px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <div className="h-[67px] pointer-events-none relative shrink-0 w-[72px]" data-name="image 2">
          <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover size-full" src={imgImage2} />
          <div aria-hidden="true" className="absolute border border-[#1d3958] border-solid inset-0" />
        </div>
        <Text />
      </div>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[24px] relative shrink-0 w-[300.488px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#99a1af] text-[16px] top-[-2.2px]">© 2026 WEND. All rights reserved.</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bg-[#072c3c] content-stretch flex h-[136px] items-center justify-between left-0 px-[32px] top-[3890px] w-[1192px]" data-name="Footer">
      <Container34 />
      <Paragraph16 />
    </div>
  );
}

export default function FY() {
  return (
    <div className="bg-[#f3f6ff] relative size-full" data-name="fY">
      <Section />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Footer />
    </div>
  );
}