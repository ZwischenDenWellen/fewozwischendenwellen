import { useState } from 'react';
import { useApartmentState } from './hooks/useApartmentState';
import { Navbar } from './components/Navbar';
import { HeroGallery } from './components/HeroGallery';
import { ApartmentSpecs } from './components/ApartmentSpecs';
import { AmenitiesSection } from './components/AmenitiesSection';
import { CalendarSection } from './components/CalendarSection';
import { LocationSection } from './components/LocationSection';
import { PricingConditions } from './components/PricingConditions';
import { ReviewsSection } from './components/ReviewsSection';
import { HostProfile } from './components/HostProfile';
import { Footer } from './components/Footer';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import { BookingModal } from './components/BookingModal';
import { ICalSyncDrawer } from './components/ICalSyncDrawer';
import { GitHubPagesModal } from './components/GitHubPagesModal';

export default function App() {
  const {
    apartment,
    updateApartment,
    feeds,
    events,
    manualBlocks,
    inquiries,
    isSyncingAll,
    syncStatusMessage,
    syncSingleFeed,
    syncAllFeeds,
    addFeed,
    updateFeed,
    deleteFeed,
    importIcsFile,
    addManualBlock,
    removeManualBlock,
    resetToDefaults,
    getExportICalContent,
    downloadExportICal,
    submitInquiry
  } = useApartmentState();

  // Modals & UI states
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isHostDrawerOpen, setIsHostDrawerOpen] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);

  // Booking modal state
  const [bookingModalData, setBookingModalData] = useState<{
    isOpen: boolean;
    checkIn: string;
    checkOut: string;
    totalEstimatedPrice: number;
  }>({
    isOpen: false,
    checkIn: '',
    checkOut: '',
    totalEstimatedPrice: 0
  });

  const handleScrollToCalendar = () => {
    const calendarEl = document.getElementById('kalender');
    if (calendarEl) {
      calendarEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBookingModal = (checkIn: string, checkOut: string, calculatedTotal: number) => {
    setBookingModalData({
      isOpen: true,
      checkIn,
      checkOut,
      totalEstimatedPrice: calculatedTotal
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-200 selection:text-stone-900">
      {/* Navigation Header */}
      <Navbar
        apartment={apartment}
        feeds={feeds}
        onOpenHostSettings={() => setIsHostDrawerOpen(true)}
        onOpenGitHubGuide={() => setIsGitHubModalOpen(true)}
        onScrollToCalendar={handleScrollToCalendar}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero & Photo Gallery */}
        <HeroGallery
          apartment={apartment}
          onOpenLightbox={(idx) => setLightboxIndex(idx)}
          onScrollToCalendar={handleScrollToCalendar}
        />

        {/* Story, Room breakdown & Specs */}
        <ApartmentSpecs
          apartment={apartment}
          onOpenHostSettings={() => setIsHostDrawerOpen(true)}
        />

        {/* Amenities List */}
        <AmenitiesSection
          amenities={apartment.amenities}
        />

        {/* Interactive Calendar & iCal Sync */}
        <CalendarSection
          apartment={apartment}
          feeds={feeds}
          events={events}
          manualBlocks={manualBlocks}
          inquiries={inquiries}
          isSyncingAll={isSyncingAll}
          syncStatusMessage={syncStatusMessage}
          onSyncAllFeeds={syncAllFeeds}
          onOpenHostSettings={() => setIsHostDrawerOpen(true)}
          onDownloadICal={downloadExportICal}
          onOpenBookingModal={handleOpenBookingModal}
        />

        {/* Location & Map */}
        <LocationSection
          apartment={apartment}
        />

        {/* Pricing Conditions & Seasons */}
        <PricingConditions
          apartment={apartment}
          onScrollToCalendar={handleScrollToCalendar}
        />

        {/* Reviews */}
        <ReviewsSection />

        {/* Host Contact Profile */}
        <HostProfile
          apartment={apartment}
          onScrollToCalendar={handleScrollToCalendar}
        />
      </main>

      {/* Footer */}
      <Footer
        apartment={apartment}
        onOpenGitHubGuide={() => setIsGitHubModalOpen(true)}
        onOpenHostSettings={() => setIsHostDrawerOpen(true)}
      />

      {/* Image Lightbox Modal */}
      <ImageLightboxModal
        photos={apartment.photos}
        initialIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
      />

      {/* Direct Booking Modal */}
      <BookingModal
        isOpen={bookingModalData.isOpen}
        onClose={() => setBookingModalData(prev => ({ ...prev, isOpen: false }))}
        checkIn={bookingModalData.checkIn}
        checkOut={bookingModalData.checkOut}
        totalEstimatedPrice={bookingModalData.totalEstimatedPrice}
        apartment={apartment}
        onSubmitInquiry={submitInquiry}
      />

      {/* Vermieter / iCal Management Drawer */}
      <ICalSyncDrawer
        isOpen={isHostDrawerOpen}
        onClose={() => setIsHostDrawerOpen(false)}
        feeds={feeds}
        manualBlocks={manualBlocks}
        inquiries={inquiries}
        apartment={apartment}
        isSyncingAll={isSyncingAll}
        onSyncSingleFeed={syncSingleFeed}
        onSyncAllFeeds={syncAllFeeds}
        onAddFeed={addFeed}
        onDeleteFeed={deleteFeed}
        onToggleFeed={updateFeed}
        onImportIcsFile={importIcsFile}
        onAddManualBlock={addManualBlock}
        onRemoveManualBlock={removeManualBlock}
        onDownloadICal={downloadExportICal}
        getExportICalContent={getExportICalContent}
        onUpdateApartment={updateApartment}
        onResetDefaults={resetToDefaults}
      />

      {/* GitHub Pages Deployment Guide Modal */}
      <GitHubPagesModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />
    </div>
  );
}
