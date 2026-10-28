import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Album } from "../models/album";

type AlbumCardProps = {
  album: Album;
  inCart: boolean;
  onToggleCart: (albumId: string) => void;
};

export function AlbumCard({ album, inCart, onToggleCart }: AlbumCardProps) {
  return (
    <View>
      <Image
        source={{ uri: album.coverUrl }}
        style={{ width: "100%", aspectRatio: 1 }}
      />
      <Text style={styles.greeting}>
        {album.title} - {album.artist}
        {new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
        }).format(album.price)}
      </Text>
      <Pressable
        disabled={!album.inStock}
        onPress={() => onToggleCart(album.id)}
        style={({ pressed }) => [
          styles.button,
          !album.inStock && styles.buttonDisabled,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text
          style={[
            styles.buttonLabel,
            !album.inStock && styles.buttonLabelDisabled,
          ]}
        >
          {!album.inStock
            ? "Épuisé"
            : inCart
              ? "Retirer du panier"
              : "Ajouter au panier"}
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  greeting: { fontSize: 18 },
  bold: { fontWeight: "700" },
  button: {
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#E2F7F4",
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: "#E5E5E5" },
  buttonPressed: { opacity: 0.6 },
  buttonLabel: { fontSize: 15, fontWeight: "600" },
  buttonLabelDisabled: { color: "#777" },
});
