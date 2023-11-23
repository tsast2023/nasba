import React, { useEffect , useState } from "react";
import { nav_menus } from "../../data";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
const Menu = () => {
  const { t } = useTranslation(); 
  const [filteredMenus, setFilteredMenus] = useState(nav_menus);
  useEffect(()=>{
    const token = Cookies.get('token');
    if(!token){
      setFilteredMenus((prevMenus) =>
      prevMenus.filter((menu) => menu.link !== "/profile"))
    }
  } , [])
  return (
    <>
      <ul>
        {filteredMenus?.map((item, index) => {

          
          return (
            <li
              key={index}
              className={`${
                item.hasDropdown && !item.megamenu
                  ? "active has-dropdown"
                  : item.megamenu && "mega-menu has-dropdown"
              }`}
            >
              <Link href={`${item.link}`}>{t(item.title)}</Link>{" "}
              {/* Use t() for translation */}
              {item?.hasDropdown && !item.megamenu && (
                <ul className="submenu transition-3">
                  {item?.dropdownItems?.map((menu, index) => (
                    <li key={index}>
                      <Link href={`${menu.link}`}>{t(menu.title)}</Link>{" "}
                      {/* Translate menu title */}
                    </li>
                  ))}
                </ul>
              )}
              {item.hasDropdown && item.megamenu && (
                <ul
                  className="submenu transition-3"
                  style={{
                    background: `url(${"/assets/img/bg/mega-menu-bg.jpg"})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center right",
                    backgroundSize: "cover",
                  }}
                >
                  {item.dropdownItems.map((menu, index) => (
                    <li
                      key={index}
                      className={`${menu.hasDropdown ? "has-dropdown" : ""}`}
                    >
                      <Link href={`${menu.link}`}>{t(menu.title)}</Link>{" "}
                      {/* Translate menu title */}
                      <ul>
                        {menu?.dropdownMenu?.map((m, index) => (
                          <li key={index}>
                            <Link href={`${m.link}`}>{t(m.title)}</Link>{" "}
                            {/* Translate menu title */}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Menu;
