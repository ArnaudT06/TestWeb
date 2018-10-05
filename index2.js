console.log("Le programme est OK");
$(document).ready(function()
{
	console.log("Document pret");
	var posDepartSouris;
	var posDepartPoignee;

	$('.potentiometre img').on('dragstart', function(event) { event.preventDefault(); });

	$('.potentiometre img').mousedown(function(event)
		{
			console.log("Bouton enfoncé");
			// Seulement le bouton gauche de la souris
			if(event.which!==1){return;}
			// Éviter de sélectionner texte si la souris bouge pendant le click
			event.preventDefault();
			var poignee=$(this);
			$('.en-mouvement').removeClass('en-mouvement');
			poignee.addClass('en-mouvement');
			// Se souvenir de la position de départ
			posDepartSouris  =event.pageX;
			posDepartPoignee =poignee.offset().left;
		});

	$('html').mouseup(function(e)
		{
			console.log("Bouton relaché.");
			$('.en-mouvement').removeClass('en-mouvement');
		});

	$('html').mousemove(function(event)
		{
			console.log("Sourie déplacé");
			var poignee=$('.en-mouvement');
			if(poignee.length===0){return;}
			var potentiometre=poignee.parent();
			var pos=event.pageX;
			pos-=posDepartSouris;
			pos+=posDepartPoignee;
			// Bord gauche du potentiomètre par rapport à la page
			var gauche=potentiometre.offset().left-12;
			if(pos<gauche){pos=gauche;}
			if(pos>gauche+potentiometre.width()){pos=gauche+potentiometre.width();}
			poignee.offset({left: pos,
							top:  poignee.offset().top});
			// largeur de la couleur de fond de la partie à gauche de la poignée
			potentiometre.find('span').width(pos-gauche);
			// Calculer la valeur du potentiometre entre 0 et 100
			var valeur=Math.round(100*(pos-gauche)/potentiometre.width());
			// Déterminer le id du span valeur à partir de l'id du potentiomètre
			var valId='valeur-'+potentiometre.attr('id');
			// Afficher la valeur
			$('#'+valId).text(valeur);
		});

	console.log("La mise en place est finie. En attente d'événements...");
});
$( function() {
  var $winHeight = $( window ).height()
  $( '.container' ).height( $winHeight );
});