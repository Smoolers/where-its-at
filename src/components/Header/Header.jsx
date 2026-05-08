import Heading from "../Heading/Heading";
import Icon from "../Icon/Icon";
import "./header.css";

const Header = ({
    leftIcon,
    onLeftClick,
    leftIconBadge,
    title,
    rightIcon,
    onRightClick,
    rightIconBadge,
}) => {
    return (
        <header className="header">
            {leftIcon ? (
                <Icon
                    name={leftIcon}
                    alt={`${leftIcon} icon`}
                    className="header__icon"
                    onClick={onLeftClick}
                    badge={leftIconBadge}
                />
            ) : (
                <span className="header__icon"></span>
            )}
            <Heading title={title} />
            {rightIcon ? (
                <Icon
                    name={rightIcon}
                    alt={`${rightIcon} icon`}
                    className="header__icon"
                    onClick={onRightClick}
                    badge={rightIconBadge}
                />
            ) : (
                <span className="header__icon"></span>
            )}
        </header>
    );
};

export default Header;
