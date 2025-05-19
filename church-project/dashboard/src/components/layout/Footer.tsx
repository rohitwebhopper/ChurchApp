const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-4 text-center text-sm text-gray-600 select-none">
      <div className="max-w-7xl mx-auto px-4">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-primary">MyChurch</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
