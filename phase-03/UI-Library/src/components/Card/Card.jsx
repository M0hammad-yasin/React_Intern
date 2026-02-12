import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({ 
  title, 
  description, 
  image, 
  children,
  className = '',
  ...props 
}) => {
  return (
    <div className={`${styles.card} ${className}`} {...props}>
      {image && (
        <div className={styles.imageWrapper}>
          <img src={image} alt={title || 'Card image'} className={styles.image} />
        </div>
      )}
      
      <div className={styles.content}>
        {title && (
          <h3 className={styles.title}>{title}</h3>
        )}
        
        {description && (
          <p className={styles.description}>{description}</p>
        )}
        
        {children && (
          <div className={styles.children}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
