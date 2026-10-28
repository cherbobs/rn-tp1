import { useColumns } from "@/hooks/use-columns";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { AlbumCard } from "../components/album-card";
import { ALBUMS } from "../data/album";

export default function Index() {
  const columns = useColumns();
  const [cartAlbumIds, setCartAlbumIds] = useState<string[]>([]);
  const bagTotal = ALBUMS.reduce(
    (total, album) =>
      cartAlbumIds.includes(album.id) ? total + album.price : total,
    0,
  );
  const formattedBagTotal = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(bagTotal);

  function toggleCart(albumId: string) {
    setCartAlbumIds((currentIds) =>
      currentIds.includes(albumId)
        ? currentIds.filter((id) => id !== albumId)
        : [...currentIds, albumId],
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.bagSummary}>
        Panier : {cartAlbumIds.length} · {formattedBagTotal}
      </Text>
      <FlatList
        data={ALBUMS}
        key={columns}
        numColumns={columns}
        renderItem={({ item }) => (
          <AlbumCard
            album={item}
            inCart={cartAlbumIds.includes(item.id)}
            onToggleCart={toggleCart}
          />
        )}
        keyExtractor={(album) => album.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bagSummary: {
    width: "100%",
    padding: 16,
    fontSize: 18,
    fontWeight: "700",
  },
  list: {
    width: "100%",
  },
});
