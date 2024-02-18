import React from "react";
import PropTypes from "prop-types";

function ServiceCard({ title, image, deliveryTime, price, user }) {
  // Utilisateur statique à afficher sur chaque carte de service
  const staticUser = {
    name: "John Doe",
    image: "/img/team-1.jpg",
    position: "Freelancer",
  };

  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {image && (
        <a href="#">
          <img className="rounded-t-lg w-full" src={image} alt={title} />
        </a>
      )}
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <div className="flex items-center mb-3">
          <p className="mr-4 font-normal text-gray-700 dark:text-gray-400">
            {deliveryTime} days delivery
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            From {price}$
          </p>
        </div>
        <hr className="horizontal-line my-3" />
        <div className="flex items-center">
          {user && user.image && (
            <img
              src={user.image}
              alt={`Profile of ${user.name}`}
              className="rounded-full w-12 h-12"
            />
          )}
          {!user && staticUser.image && (
            <img
              src={staticUser.image}
              alt={`Profile of ${staticUser.name}`}
              className="rounded-full w-12 h-12"
            />
          )}
          <div className="ml-3">
            {user && (
              <>
                <h3 className="text-xl font-bold">{user.name}</h3>
                <div className="text-gray-600 text-sm">{user.position}</div>
              </>
            )}
            {/* Affichage de l'utilisateur statique */}
            {!user && (
              <>
                <h3 className="text-xl font-bold">{staticUser.name}</h3>
                <div className="text-gray-600 text-sm">{staticUser.position}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  deliveryTime: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
  }),
};

export default ServiceCard;
