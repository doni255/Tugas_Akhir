import React from "react";

const ContactUs = () => {
  return (
    <section id="contact-us" className="py-11 bg-[#1F2326] ">
      <div className="container mx-auto flex flex-col place-items-start">
        <div className="bg-transparent rounded-lg p-8">
          <div className="flex justify-center">
            <div className="w-2/4">
              <h2 className="text-4xl md:text-4xl text-gray-200 font-bold mb-4">
                Can we help you?
              </h2>
            </div>
            <div className="w-auto">
              <p className="text-gray-400 mb-4">
                Jika ingin tahu lebih jauh tentang produk yang ada di toko ini,
                kami dengan senang hati akan membantu anda.
              </p>
              <a
                href="https://api.whatsapp.com/send/?phone=%2B6282154164970&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-green-600 text-white rounded-md px-6 py-3 font-semibold hover:bg-green-700 transition">
                  Contact Us
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
