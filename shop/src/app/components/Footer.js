// components/Footer.js
import styles from './Footer.module.css';
import { FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer + ' font-vazir'}>
      <div className={styles.footerMain}>
        {/* Logo/About */}
        <div className={styles.col}>
          <img src="/logo.svg" alt="لوگو" className={styles.logo} />
          <p className={styles.about}>
            تجربه بازی خود را با Polywick Studio ارتقا دهید؛ دروازه‌ای به دنیای طراحی هنری سه‌بعدی بازی‌ها.
          </p>
        </div>
        {/* Navigation */}
        <div className={styles.col}>
          <h4 className={styles.title}>ناوبری</h4>
          <ul className={styles.links}>
            <li><a href="/">خانه</a></li>
            <li><a href="/admins">مدیران</a></li>
            <li><a href="/company">شرکت</a></li>
            <li><a href="/clients">مشتریان</a></li>
            <li><a href="/contact">تماس با ما</a></li>
          </ul>
        </div>
        {/* Portfolio */}
        <div className={styles.col}>
          <h4 className={styles.title}>نمونه کارها</h4>
          <ul className={styles.links}>
            <li><a href="#">شخصیت‌ها</a></li>
            <li><a href="#">مجسمه‌ها</a></li>
            <li><a href="#">سلاح‌ها</a></li>
            <li><a href="#">نمای بیرونی</a></li>
            <li><a href="#">وسایل نقلیه</a></li>
            <li><a href="#">فضاهای داخلی</a></li>
            <li><a href="#">مبلمان</a></li>
          </ul>
        </div>
        {/* Contact */}
        <div className={styles.col}>
          <h4 className={styles.title}>ارتباط با ما</h4>
          <div className={styles.contactItem}>
            <FaEnvelope className={styles.icon} />
            <span>Finearts@polywickstudio.com</span>
          </div>
          <div className={styles.contactItem}>
            <FaMapMarkerAlt className={styles.icon} />
            <span>
              #۱۲-۱۱، پلاک ۲۳۰۱، Civic Place،<br />
              فیلین‌وست، آلابانگ،<br />
              شهر مونتینلوپا، NCR مانیلا،<br />
              فیلیپین ۱۷۸۱.
            </span>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <span>© ۲۰۱۴-۲۰۲۴ Polywick Graphics, Ph, Corp. تمامی حقوق محفوظ است.</span>
        <div className={styles.socials}>
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  );
}