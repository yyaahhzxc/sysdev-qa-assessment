import React, { useState } from 'react';
import { ShoppingBag, Tag, Truck, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';

import { ViewportMode } from '../../types/assessment';

interface SysDEVMerchSiteProps {
  discoveredBugIds: number[];
  onDiscoverBug: (id: number) => void;
  viewportMode: ViewportMode;
  onInspect?: (e: React.MouseEvent, isBug: boolean, title: string, bugId?: number) => void;
}

export const SysDEVMerchSite: React.FC<SysDEVMerchSiteProps> = ({
  discoveredBugIds,
  onDiscoverBug,
  viewportMode,
  onInspect,
}) => {
  // E-Commerce Simulation State
  const [jacketQty, setJacketQty] = useState<number>(0);
  const [jacketOption, setJacketOption] = useState<'standard' | 'embroidered'>('standard');
  const [lanyardQty, setLanyardQty] = useState<number>(0);
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [badgeCount, setBadgeCount] = useState<number>(0);

  const handleContextMenu = (e: React.MouseEvent, isBug: boolean, title: string, bugId?: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (onInspect) {
      onInspect(e, isBug, title, bugId);
    } else {
      if (isBug && bugId) onDiscoverBug(bugId);
    }
  };

  const isBugDiscovered = (id: number) => discoveredBugIds.includes(id);

  // Unit Price Calculation
  // BUG #11: Varsity Jacket option extra-zero glitch (1200 -> 12000 when embroidered is checked!)
  const jacketUnitPrice = jacketOption === 'embroidered' ? 12000 : 1200;
  const lanyardUnitPrice = 150;

  // Subtotal Calculation (Notice: allowing negative qty to subtract from subtotal!)
  const subtotal = (jacketQty * jacketUnitPrice) + (lanyardQty * lanyardUnitPrice);

  // Value Added Tax (12%)
  const computedVat = Math.round(subtotal * 0.12);

  // BUG #10: Delivery Fee defiant threshold (bills ₱150 even when subtotal > ₱1,500!)
  const deliveryFee = 150;

  // BUG #8: Inverted Promo Voucher (SYSDEV50 adds ₱50 instead of subtracting!)
  const voucherAdjustment = appliedPromo === 'SYSDEV50' ? 50 : 0;

  const grandTotal = subtotal + computedVat + deliveryFee + voucherAdjustment;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCodeInput.trim().toUpperCase() === 'SYSDEV50') {
      setAppliedPromo('SYSDEV50');
      setPromoCodeInput('');
    } else {
      alert("Invalid promotional voucher code. Try 'SYSDEV50' for student discount.");
    }
  };

  const handleAddLanyard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLanyardQty((prev) => prev + 1);
    // BUG #12: Cart badge inflates by +3 instead of +1!
    setBadgeCount((prev) => prev + 3);
  };

  return (
    <div className="bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans min-h-full pb-24 select-none">
      
      {/* Top Promotional Guarantee Banner - Key context for Bug #10 */}
      <div className="bg-sysdev-navy text-white px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 border-b border-slate-800 text-center">
        <Truck className="w-4 h-4 text-sysdev-gold shrink-0 animate-bounce" />
        <span>ALL ORDERS UNTIL AUGUST 31, 2026: <strong className="text-sysdev-gold">Free Davao City Delivery on all orders!</strong> Use coupon code <span className="text-sysdev-gold font-mono font-bold">SYSDEV50</span> for ₱50 discount!</span>
      </div>

      {/* Merch Store Navbar */}
      <header className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sysdev-navy flex items-center justify-center text-sysdev-gold font-bold text-xs shadow-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-900 dark:text-white tracking-wide block">
                SYSDEV OFFICIAL MERCH STORE
              </span>
              <span className="text-[10px] font-mono text-slate-500 block">
                AdDU Systems Development Merchandise
              </span>
            </div>
          </div>

          {/* Top Cart Badge Indicator - BUG #12 (Desynced Badge Count) */}
          <div
            onContextMenu={(e) => {
              const hasAddedItem = badgeCount > 0;
              handleContextMenu(e, hasAddedItem, "Cart Badge Count Desync (+3 per add)", hasAddedItem ? 12 : undefined);
            }}
            className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 cursor-pointer transition ${
              isBugDiscovered(12) ? 'bug-discovered' : 'hover:bg-slate-200/60'
            }`}
          >
            <ShoppingCart className="w-4 h-4 text-sysdev-navy dark:text-sysdev-gold shrink-0" />
            <span className="text-xs font-bold font-mono">Cart Items</span>
            <span className="w-6 h-6 rounded-full bg-sysdev-navy text-sysdev-gold text-xs font-mono font-extrabold flex items-center justify-center shadow-inner">
              {badgeCount}
            </span>
          </div>
        </div>
      </header>

      {/* Main Catalog & Billing Sandbox Grid */}
      <div className={`max-w-6xl mx-auto px-4 py-8 grid gap-8 items-start ${viewportMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 sm:px-8'} ${viewportMode === 'desktop' ? 'lg:grid-cols-12' : ''}`.replace('lg:', '')}>
        
        {/* Left: Product Catalog (Columns 7) */}
        <div className={`${viewportMode === 'desktop' ? 'col-span-7' : 'col-span-1'} space-y-6`}>
          <div className="border-b border-slate-200 dark:border-zinc-800 pb-3">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-sysdev-navy dark:text-sysdev-gold" />
              <span>Academic Semester Catalog</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Select customized departmental clothing, student lanyards, and accessories.
            </p>
          </div>

          {/* Product 1: Varsity Jacket */}
          <div
            onContextMenu={(e) => handleContextMenu(e, false, "Product Card: Varsity Jacket")}
            className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 rounded-xl bg-slate-100 dark:bg-zinc-800 overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=300&q=80" alt="Varsity Jacket" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase bg-indigo-50 text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-300 font-bold px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-900">
                    Department Apparel
                  </span>
                  {/* BUG #11: Unit Price jumping to ₱12,000 when embroidered is checked */}
                  <span
                    onContextMenu={(e) => handleContextMenu(e, true, "Varsity Jacket Extra-Zero Typo (₱12,000)", 11)}
                    className={`text-base font-black font-mono text-sysdev-navy dark:text-sysdev-gold ${
                      isBugDiscovered(11) ? 'bug-discovered px-2' : ''
                    }`}
                  >
                    ₱{jacketUnitPrice.toLocaleString()}.00
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-slate-950 dark:text-white mt-1">
                  SAMAHAN SysDEV Official Varsity Jacket (2026 Edition)
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mt-1">
                  Heavyweight premium poly-wool fleece jacket with SAMAHAN SysDEV logo embroidery and interior lining.
                </p>
              </div>
            </div>

            {/* Customization Option - BUG #11 trigger */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Jacket Customization Option:
              </span>
              <select
                value={jacketOption}
                onChange={(e) => setJacketOption(e.target.value as any)}
                onContextMenu={(e) => handleContextMenu(e, true, "Varsity Jacket Customization Extra-Zero Glitch", 11)}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none cursor-pointer shadow-2sm"
              >
                <option value="standard">Standard Edition (₱1,200.00)</option>
                <option value="embroidered">Custom Embroidered Name (+₱100.00)</option>
              </select>
            </div>

            {/* Quantity Control Row - BUG #7 (Negative Cart Quantity Underflow below 0) */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-zinc-800/80">
              <span className="text-xs font-bold text-slate-600 dark:text-zinc-400">Selected Cart Quantity:</span>
              
              <div
                onContextMenu={(e) => handleContextMenu(e, true, "Negative Cart Quantity Underflow below zero", 7)}
                className={`flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg border border-slate-200 dark:border-zinc-700 ${
                  isBugDiscovered(7) ? 'bug-discovered' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => setJacketQty((prev) => prev - 1)} // Underflow bug! No Math.max(0)!
                  className="w-7 h-7 rounded bg-white dark:bg-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-600 flex items-center justify-center font-black transition text-xs shadow-2sm"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-mono font-bold text-xs">
                  {jacketQty}
                </span>
                <button
                  type="button"
                  onClick={() => setJacketQty((prev) => prev + 1)}
                  className="w-7 h-7 rounded bg-white dark:bg-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-600 flex items-center justify-center font-black transition text-xs shadow-2sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product 2: Woven Lanyard - BUG #12 (+3 Badge Bug on Add to Cart) */}
          <div
            onContextMenu={(e) => handleContextMenu(e, false, "Product Card: Woven Lanyard")}
            className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div 
                onContextMenu={(e) => handleContextMenu(e, true, "Product Image Mismatch (Wallet instead of Lanyard)", 9)}
                className={`w-20 h-20 rounded-xl bg-slate-100 dark:bg-zinc-800 overflow-hidden shrink-0 cursor-pointer ${isBugDiscovered(9) ? 'bug-discovered' : ''}`}
              >
                <img src="https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=300&q=80" alt="Lanyard" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase bg-amber-50 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-200 dark:border-amber-900">
                  Accessory
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                  SAMAHAN SysDEV Woven Lanyard & ID Holder
                </h4>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                  Durable satin-weave lanyard with heavy-duty alloy buckle for Ateneo de Davao IDs.
                </p>
                <span className="font-mono font-bold text-sm text-sysdev-navy dark:text-sysdev-gold mt-2 block">
                  ₱150.00
                </span>
              </div>
            </div>

            <button
              onClick={handleAddLanyard}
              onContextMenu={(e) => handleContextMenu(e, true, "Cart Badge Count Desync (+3 on Add)", 12)}
              className={`px-4 py-2 bg-sysdev-gold hover:bg-yellow-400 text-slate-950 rounded-lg font-bold text-xs shadow-sm transition shrink-0 cursor-pointer ${
                isBugDiscovered(12) ? 'bug-discovered' : ''
              }`}
            >
              Add to Cart
            </button>
          </div>

        </div>

        {/* Right: Order Summary & Checkout (Columns 5) */}
        <div className={`${viewportMode === 'desktop' ? 'col-span-5' : 'col-span-1'} space-y-6`}>
          
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-3">
              <h3 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-sysdev-navy dark:text-sysdev-gold" />
                <span>Order Billing Summary</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">2 Line Items</span>
            </div>

            {/* Line Items Snapshot */}
            <div className="space-y-3 text-xs border-b border-slate-100 dark:border-zinc-800 pb-4 font-mono">
              <div className="flex justify-between text-slate-700 dark:text-zinc-300">
                <span>Varsity Jacket (x{jacketQty}):</span>
                <span className="font-bold">₱{(jacketQty * jacketUnitPrice).toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-zinc-300">
                <span>Woven Lanyard (x{lanyardQty}):</span>
                <span className="font-bold">₱{(lanyardQty * lanyardUnitPrice).toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between text-slate-900 dark:text-white font-extrabold pt-2 border-t border-slate-200 dark:border-zinc-800">
                <span>Order Subtotal:</span>
                <span>₱{subtotal.toLocaleString()}.00</span>
              </div>
            </div>

            {/* Tax and Shipping Calculation Breakdown */}
            <div className="space-y-3 font-mono text-xs">
              
              {/* Value Added Tax (12%) */}
              <div
                onContextMenu={(e) => handleContextMenu(e, false, "Value Added Tax (12%)")}
                className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 cursor-pointer hover:bg-slate-100/50"
              >
                <span className="text-slate-700 dark:text-zinc-300">Value Added Tax (12%):</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  ₱{computedVat.toLocaleString()}.00
                </span>
              </div>

              {/* BUG #10: Defiant Free Shipping Policy (Billed ₱150 despite subtotal > ₱1,500) */}
              <div
                onContextMenu={(e) => handleContextMenu(e, true, "Defiant Free Delivery Threshold Policy", 10)}
                className={`flex justify-between items-center p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 cursor-pointer ${
                  isBugDiscovered(10) ? 'bug-discovered font-bold' : 'hover:bg-slate-100/50'
                }`}
              >
                <span className="text-slate-700 dark:text-zinc-300">Delivery Fee (Davao City):</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  ₱{deliveryFee.toLocaleString()}.00
                </span>
              </div>

              {/* BUG #8: Inverted Promo Voucher (+₱50 instead of -₱50) */}
              {appliedPromo && (
                <div
                  onContextMenu={(e) => handleContextMenu(e, true, "Inverted Voucher Calculation (+₱50 instead of -₱50)", 8)}
                  className={`flex justify-between items-center p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 text-indigo-900 dark:text-indigo-200 cursor-pointer ${
                    isBugDiscovered(8) ? 'bug-discovered font-bold' : 'hover:bg-indigo-100/60'
                  }`}
                >
                  <span>Voucher Discount (SYSDEV50):</span>
                  <span className="font-bold font-mono">+₱50.00</span>
                </div>
              )}
            </div>

            {/* Voucher Coupon Form */}
            <div className="pt-2">
              <form onSubmit={handleApplyPromo} className="flex items-center gap-2">
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  placeholder="enter code 'SYSDEV50'"
                  onContextMenu={(e) => handleContextMenu(e, false, "Voucher Coupon Input Field")}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-mono uppercase font-bold focus:outline-none focus:ring-1 focus:ring-sysdev-navy transition"
                />
                <button
                  type="submit"
                  onContextMenu={(e) => handleContextMenu(e, false, "Apply Voucher Button")}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg text-xs font-bold transition shrink-0"
                >
                  Apply
                </button>
              </form>
            </div>

            {/* Grand Total Bar */}
            <div className="pt-4 border-t-2 border-slate-900 dark:border-zinc-700 flex items-center justify-between">
              <span className="font-black text-sm uppercase text-slate-900 dark:text-white">Grand Total Due:</span>
              <span className="text-xl font-black font-mono text-sysdev-navy dark:text-sysdev-gold">
                ₱{grandTotal.toLocaleString()}.00
              </span>
            </div>

            {/* Checkout Decoy Button */}
            <button
              type="button"
              onClick={() => alert("Proceeding to AdDU SAMAHAN Student Payment Gateway...")}
              onContextMenu={(e) => handleContextMenu(e, false, "Proceed to Checkout Button")}
              className="w-full py-3 bg-sysdev-navy hover:bg-slate-900 text-white rounded-xl font-extrabold text-xs sm:text-sm shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>Proceed to Student Payment Gateway</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
